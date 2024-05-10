import React, {useEffect, useRef, useState} from "react";
import styled, {css} from "styled-components";
import ColorThief from 'colorthief';
import {Table, Typography} from "@douyinfe/semi-ui";
import {useTrafficLightControl} from "@/utils/trafficLightControl.ts";
import InlineSvg from "react-inlinesvg";
import trafficLightIcon from "@/assets/icons/traffic-light.svg";
import {ColumnProps} from "@douyinfe/semi-ui/lib/es/table/interface";

const {Title} = Typography;

interface Props {
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  //background: linear-gradient(#e66465, #9198e5);
`
const ImgContainer = styled.div`
  display: grid;
  grid-template-columns:repeat(2,1fr);
  grid-template-rows: repeat(2,1fr);
  //height: 800px;
  width: 50%;
  grid-gap: 20px;
  margin: auto;

  padding: 20px;

  //background: lightblue;

`

const LightIcon = styled(InlineSvg)<{$lightStatus?: string}>`

  .light {
    fill: #999 !important;
  }

  ${({$lightStatus}) => {
    if ($lightStatus === 'green') {
      return css`
        .first {
          fill: #2BBF60 !important;
        }
      `
    }
    if ($lightStatus === 'yellow') {
      return css`
        .second {
          fill: #EAB42D !important;
        }
      `
    }
    if ($lightStatus === 'red') {
      return css`
        .third {
          fill: #EA4949 !important;
        }
      `
    }

    return css``
  }}



  //.first {
  //  fill: #EA4949 !important;
  //}
  //.second {
  //  fill: #2BBF60 !important;
  //}
  //.third {
  //  fill: #EAB42D !important;
  //}
`

const imageList = new Array(4).fill(0).map((_, index) => {
  return {
    id: index,
    url: `https://picsum.photos/150/100?random=${index}`,
  }
})



export const TRAFFIC_LIGHTS = [
  {
    id: 'north',
    lights: [
      {
        objectName: 'BP_直行灯_C_0',
      },
      {
        objectName: 'BP_左转灯_C_0',
      },
    ],
  },
  {
    id: 'east',
    lights: [
      {
        objectName: 'BP_直行灯_C_2',
      },
      {
        objectName: 'BP_左转灯_C_2',
      },
    ],
  },
  {
    id: 'south',
    lights: [
      {
        objectName: 'BP_直行灯_C_3',
      },
      {
        objectName: 'BP_左转灯_C_3',
      },
    ],
  },
  {
    id: 'west',
    lights: [
      {
        objectName: 'BP_直行灯_C_1',
      },
      {
        objectName: 'BP_左转灯_C_1',
      },
    ],
  },
]

const Demo_TrafficLight: React.FC<Props> = (props) => {
  const {...restProps} = props;
  const [data, setData] = useState(TRAFFIC_LIGHTS.map(t => ({id: t.id, lightStatus: ''})))

  const {changeLight, updateAllLightsRegular, initTrafficLights} = useTrafficLightControl(TRAFFIC_LIGHTS, (p ,colorItem) => {
    console.log('updateAllLightsRegular', p, colorItem)
    const newData = data?.map(t => {
      const light = p.find(d => d.id === t.id)
      if (light) {
        t.lightStatus = colorItem.type
      }
      return t
    })

    console.log('newData', newData)
    setData(newData)

  })

  const initLights = async () => {
    await initTrafficLights()

    const times = [
      {
        type: 'green',
        time: 5,
      },
      {
        type: 'yellow',
        time: 2,
      },

      {
        type: 'red',
        time: 5,
      },
    ]

    setTimeout(() => {

      updateAllLightsRegular(TRAFFIC_LIGHTS[0].id, times)

    }, 1000)
  }
  const __main = async () => {
    initLights()
  }

  useEffect(() => {
    __main()
  }, [])


  const columns: ColumnProps[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Light',
      render: (text, record) => {
        const light = record?.lightStatus
        console.log('light', light, record)
        return (
          <LightIcon width={80} height={80} className="light" src={trafficLightIcon} $lightStatus={light}></LightIcon>

        );
      },
    },
  ];



  return (
    <Wrapper {...restProps}>
      <Title style={{textAlign: 'center'}} heading={2}>Traffic light simulation</Title>

      <ImgContainer>
        <Table columns={columns} dataSource={data} pagination={false} />
      </ImgContainer>

    </Wrapper>
  );
}
export default Demo_TrafficLight;
