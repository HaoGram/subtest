import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import ColorThief from 'colorthief';
interface Props {
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  //background: linear-gradient(#e66465, #9198e5);
`
const ImgContainer = styled.div`
  display: grid;
  grid-template-columns:repeat(3,1fr);
  grid-template-rows: repeat(3,1fr);
  //height: 800px;
  width: 100%;
  grid-gap: 30px;
  margin: auto;

  padding: 40px;

  img {
    width: 100%;
    text-align: center;
    background: pink;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      opacity: 1;
      scale: 1.1;
    }
  }
`

const imageList = new Array(9).fill(0).map((_, index) => {
  return {
    id: index,
    url: `https://picsum.photos/400/300?random=${index}`,
  }
})
export const ImageBackground: React.FC<Props> = (props) => {
  const {...restProps} = props;

  const [imageIndex, setImageIndex] = useState<number>()
  const imgColorArray = useRef([])


  const onLoad = async (e, index: number) => {
    const colorThief = new ColorThief()
    const color = await colorThief.getPalette(e.target, 2)
    const curColorArr = color.map(c => `rgb(${c.join(',')})`)

    imgColorArray.current[index] = curColorArr
    if (imageIndex === undefined && index === 0) {
      setImageIndex(index)
    }
  }

  useEffect(() => {

  }, [])
  return (
    <Wrapper {...restProps}>
      <h1 style={{textAlign: 'center'}}>Image palette</h1>

      <ImgContainer style={{background: `linear-gradient(${imgColorArray.current[imageIndex]?.join(',')})`}}>
        {
          imageList.map((img, i) => {
            return (
              <img
                key={i}
                crossOrigin="anonymous"
                src={img.url}
                style={{opacity: imageIndex === i ? 1 : 0.2}}
                onLoad={(e) => onLoad(e, i)}
                onMouseEnter={() => setImageIndex(i)}
                alt=""
              />
            )
          })
        }
      </ImgContainer>

    </Wrapper>
  );
}
