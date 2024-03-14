import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import {Typography, Upload} from "@douyinfe/semi-ui";
import {OnChangeProps} from "@douyinfe/semi-ui/lib/es/upload";
const {Title, Text} = Typography;

interface Props {

}

const Wrapper = styled.div`

  .imageList {
    width: 100%;
    display: flex;
    overflow-x: auto;
    overflow-y: visible;
    padding: 50px;
  }
  img {
    width: 200px;
    height: auto;
    margin: 5px;
    position: relative;

    transition: all 0.2s ease-in-out;
    &:hover {
      transform: scale(1.5);
      z-index: 1;
    }
  }
`
const getVideoTime = (videoFile: Blob): Promise<number> => {
  return new Promise(resolve => {
    if (!videoFile) {
      resolve(0)
      return
    }
    const videoEle = document.createElement('video')
    videoEle.autoplay = false
    videoEle.muted = true
    videoEle.src = URL.createObjectURL(videoFile)

    videoEle.onloadedmetadata = () => {
      const duration = videoEle.duration;
      resolve(duration)
    }
  })
}

// video -> canvas -> picture
const captureFrame = (file: Blob, time = 0) => {
  return new Promise(resolve => {
    if (!file) {
      resolve(undefined)
      return
    }

    let videoEle: HTMLVideoElement | null = document.createElement('video')
    videoEle.autoplay = true
    videoEle.muted = true
    videoEle.width = 400
    videoEle.height = 300
    videoEle.src = URL.createObjectURL(file)

    videoEle.currentTime = time

    videoEle.onloadeddata = () => {
      const currentTime = videoEle?.currentTime

      // console.log('onloadeddata', currentTime)

      let canvasEle: HTMLCanvasElement | null = document.createElement('canvas')

      canvasEle.width = videoEle?.videoWidth || 400
      canvasEle.height = videoEle?.videoHeight || 300

      const ctx = canvasEle.getContext('2d')
      ctx && videoEle && ctx.drawImage(videoEle, 0, 0, canvasEle.width, canvasEle.height)

      canvasEle.toBlob((blob) => {
        const url = blob && URL.createObjectURL(blob)
        const obj = {
          url,
          blob,
          currentTime,
        }
        resolve(obj)
        canvasEle?.remove()
        canvasEle = null
      })
      videoEle?.remove()
      videoEle = null
    }



  })

}
export const sleep = (time = 100) => new Promise((resolve) => {
  setTimeout(() => resolve(null), time);
});
export const Demo_VideoFrame: React.FC<Props> = (props) => {
  const {...restProps} = props

  const [frameList, setFrameList] = useState<any[]>([])

  const onChange = async (e: any) => {
    const file = e.target.files[0]

      const frameLen = 5

      const picArr: any[] = new Array(frameLen)
      // setFrameList(picArr)

      const framePromises = [];

      for (let i = 0; i < frameLen; i++) {

        const proUnit = captureFrame(file, i).then((res) => {
          picArr[i] = res
          setFrameList([...picArr])
          return res
        })
        framePromises.push(proUnit);
      }

      console.time('all')
      try {
        const frames = await Promise.all(framePromises);
        console.log('frames', frames)

      } catch (e) {
        console.error('error', e)
      }
      console.timeEnd('all')


  }
  return <Wrapper {...restProps} >
    <div style={{marginBottom: 20}}>
      <Title heading={2}>Video frame</Title>
      <Text>This demo only shows 5 frames</Text>
    </div>

    {/*<Upload onChange={onChange}>Upload</Upload>*/}
    <input type="file" onChange={onChange} />
    <div className="imageList">
      {
        frameList?.map((item, i) => {
          return <img key={i} src={item?.url} alt=""/>
        })
      }

    </div>

  </Wrapper>;
};
