

const trafficLightTimer: Record<string, NodeJS.Timeout[]> = {}
export const useTrafficLightControl = (trafficLights: ({ id: string } & Record<string, any>)[], onLightUpdate?: (...args: any[]) => void) => {

  const trafficLightsList = trafficLights

  const clearLightInterval = (id?: any) => {

    let timerArr = []
    if (id !== undefined) {
      timerArr = trafficLightTimer?.[id] || []
      trafficLightTimer[id] = []
    } else {
      timerArr = Object.values(trafficLightTimer).reduce((r, t) => [...r, ...t], [])
      trafficLightsList.forEach(t => {
        trafficLightTimer[t.id] = []
      })
    }
    timerArr?.forEach((t) => {
      clearTimeout(t)
    })

  }
  const updateLightInterval = (key: any, val: any) => {
    if (!trafficLightTimer[key]) {
      trafficLightTimer[key] = []
    }
    trafficLightTimer[key].push(val)

  }

  const lightUpdate = (p: any, color: any) => {
    // console.log('lightUpdate', p, color)

    onLightUpdate?.(p, color)
  }

  const changeLight = async (lightParam: {
    id: number,
    type: 'red' | 'green' | 'yellow',
    isLoop?: boolean
  }, times = [3, 3, 1], changeType?: string) => {
    // drawTrafficLights()

    const lightId = Number(lightParam.id)
    const isLoop = lightParam?.isLoop
    console.log('changeLight', lightParam)

    // [red, green, yellow]
    const lightTimes = times
    const lightColorMap: any = {
      red: {
        type: 'red',
        value: '红',
      },
      green: {
        type: 'green',
        value: '绿',
      },
      yellow: {
        type: 'yellow',
        value: '黄',
      },
    }
    // only red and green
    const switchColors = [
      {
        type: 'red',
        value: '红'
      },
      {
        type: 'green',
        value: '绿'
      },
    ]


    const changeLightAuto = async () => {
      clearLightInterval(lightId)

      const colorItem = switchColors.find(t => t.type === lightParam?.type)
      const colorValueIndex = switchColors.findIndex(t => t.type === lightParam.type)


      await lightUpdate(lightParam)
      if (!isLoop) {
        return
      }

      const t1 = setTimeout(async () => {

        lightUpdate(lightParam)

        const anotherIndex = (colorValueIndex + 1) % switchColors.length
        const anotherColorItem = switchColors[anotherIndex]
        const t2 = setTimeout(async () => {

          lightUpdate(lightParam)

          if (!isLoop) return
          const t3 = setTimeout(() => {

            changeLightAuto()
          }, lightTimes[anotherIndex] * 1000)
          // trafficLightTimer[lightId][3] = t3
          updateLightInterval(lightId, t3)

        }, (lightTimes[2]) * 1000)
        // trafficLightTimer[lightId][2] = t2
        updateLightInterval(lightId, t2)


      }, lightTimes[colorValueIndex] * 1000)
      // trafficLightTimer[lightId][1] = t1
      updateLightInterval(lightId, t1)


    }

    changeLightAuto()

  }

  const changeMultiLight = async (lightParam: { id: string | string[], isLoop?: boolean }, colorTimes: {
    type: 'red' | 'green' | 'yellow',
    time?: number
  }[], changeType?: string) => {
    // drawTrafficLights()

    const isLoop = lightParam?.isLoop
    // const lightColorType = lightParam?.type
    const updateLights = Array.isArray(lightParam?.id) ? lightParam?.id : [lightParam?.id]

    const updateColors = colorTimes

    const intervalType = 'multi_' + updateLights.join('')
    const changeLightAuto = async () => {
      clearLightInterval(intervalType)

      let curTime = 0
      for (let i = 0; i < updateColors.length; i++) {
        const colorItem = updateColors[i]
        const prevItem = updateColors[i - 1]

        // time interval use the time of last of light
        curTime = (prevItem ? (prevItem as any)?.time : 0) + curTime

        const timer = setTimeout(async () => {
          const lightParamArr = []

          for (const item of updateLights) {
            const lightId = item
            const curLightItem = trafficLightsList.find(t => t.id === lightId)
            lightParamArr.push(curLightItem)

          }
          lightUpdate(lightParamArr, colorItem)

        }, curTime * 1000)

        if (isLoop && i === updateColors.length - 1) {
          const timer4 = setTimeout(() => {
            changeLightAuto()
          }, (curTime + (colorItem?.time || 0)) * 1000)
          // trafficLightTimer[intervalType][i + 1] = timer4
          updateLightInterval(intervalType, timer4)

        }

        // console.log('curTime', curTime)
        // if (!trafficLightTimer[intervalType]) trafficLightTimer[intervalType] = []
        // trafficLightTimer[intervalType][i] = timer
        updateLightInterval(intervalType, timer)

      }
    }
    await changeLightAuto()


  }

  const allLightRegularTimerType = 'all-regular'
  const changeAllLight = (id: string, colorTimes: number[], originId?: any) => {
    const originLightId = (originId !== undefined) ? originId : id
    clearLightInterval(allLightRegularTimerType)

    const [redTime, greenTime, yellowTime] = colorTimes

    const lightIdsAll = trafficLightsList.map(t => t.id)

    const greenLights = lightIdsAll.filter(t => t === String(id))
    const redLights = lightIdsAll.filter(t => t !== String(id))


    console.log('greenLights', greenLights, redLights)
    changeMultiLight({
      id: greenLights,
      isLoop: false,

    }, [
      {
        type: 'green',
        // time: 0,
      },
    ])

    changeMultiLight({
      id: redLights,
      isLoop: false,

    }, [
      {
        type: 'red',
        // time: 0,
      },
    ])

    const timer = setTimeout(() => {

      changeMultiLight({
        id: greenLights,
        isLoop: false,
      }, [
        {
          type: 'yellow',
          // time: yellowTime,
        },
      ])

      const timer = setTimeout(() => {
        const curIdIndex = lightIdsAll.findIndex(t => t === id)
        const nextId = lightIdsAll[(curIdIndex + 1) % lightIdsAll.length]
        changeAllLight(nextId, colorTimes, originId)

      }, yellowTime * 1000)

      updateLightInterval(allLightRegularTimerType, timer)

    }, (originLightId === id ? greenTime : redTime) * 1000)


    updateLightInterval(allLightRegularTimerType, timer)

  }

  const updateAllLightsRegular = (id: string, times: any[]) => {
    // clearLightInterval()

    // only one light is green, other light is red
    const lightIdsAll = trafficLightsList.map(t => t.id)


    const lightTimes = times || []

    const yellowTime = lightTimes.find(t => t.type === 'yellow')?.time
    const greenTime = lightTimes.find(t => t.type === 'green')?.time
    const redTime = lightTimes.find(t => t.type === 'red')?.time

    changeMultiLight({
      id: lightIdsAll,
      isLoop: false,
    }, [
      {
        type: 'yellow',
        time: yellowTime,
      },
    ])

    clearLightInterval(allLightRegularTimerType)

    const timer = setTimeout(() => {
      changeAllLight(id, [redTime, greenTime, yellowTime])

    }, 1 * 1000)
    updateLightInterval(allLightRegularTimerType, timer)
  }
  const initTrafficLights = async () => {

    const lightIdsAll = trafficLightsList.map(t => t.id)

    await changeMultiLight({
      id: lightIdsAll,
      isLoop: false,

    }, [
      {
        type: 'green',
        // time: 0,
      },
    ])

  }

  return {
    changeLight,
    updateAllLightsRegular,
    clearLightInterval,
    changeMultiLight,
    initTrafficLights,
  }
}
