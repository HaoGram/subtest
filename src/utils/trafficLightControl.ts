
type TrafficLightItem = {
  id: string
  [key: string]: any
}
type ColorTimeItem = {
  type: 'red' | 'green' | 'yellow',
  time?: number
}

const trafficLightTimer: Record<string, NodeJS.Timeout[]> = {}

// 交通灯控制
export const useTrafficLightControl = (trafficLights: TrafficLightItem[], onLightUpdate?: (lights: TrafficLightItem[], color: ColorTimeItem) => void) => {

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

  // 更新定时器缓存数组
  const updateLightInterval = (key: any, val: any) => {
    if (!trafficLightTimer[key]) {
      trafficLightTimer[key] = []
    }
    trafficLightTimer[key].push(val)

  }

  const lightUpdate: typeof onLightUpdate = (lights, color) => {
    // console.log('lightUpdate', p, color)

    onLightUpdate?.(lights, color)
  }

  const changeMultiLight = async (lightParam: { id: string | string[], isLoop?: boolean }, colorTimes: ColorTimeItem[], changeType?: string) => {
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
            if (curLightItem) {
              lightParamArr.push(curLightItem)

            }

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
  // 定时改变灯颜色
  const changeAllLight = (id: string, colorTimes: number[], originId?: any) => {
    const originLightId = (originId !== undefined) ? originId : id
    clearLightInterval(allLightRegularTimerType)

    const [redTime, greenTime, yellowTime] = colorTimes

    const lightIdsAll = trafficLightsList.map(t => t.id)

    const greenLights = lightIdsAll.filter(t => t === String(id))
    const redLights = lightIdsAll.filter(t => t !== String(id))


    // console.log('greenLights', greenLights, redLights)
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

  const updateAllLightsRegular = (id: string, times: {type: string, time: number}[]) => {
    console.log('updateAllLightsRegular', id, times)
    // only one light is green, other light is red
    const lightIdsAll = trafficLightsList.map(t => t.id)

    const lightTimes = times || []

    const yellowTime = lightTimes.find(t => t.type === 'yellow')?.time || 0
    const greenTime = lightTimes.find(t => t.type === 'green')?.time || 0
    const redTime = lightTimes.find(t => t.type === 'red')?.time || 0

    // 先更改所有灯颜色为黄色
    changeMultiLight({
      id: lightIdsAll,
      isLoop: false,
    }, [
      {
        type: 'yellow',
        time: yellowTime,
      },
    ])

    // 清楚之前的定时器
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
    updateAllLightsRegular,
    clearLightInterval,
    changeMultiLight,
    initTrafficLights,
  }
}
