import styled from "styled-components";
import React, {useEffect, useRef, useState} from "react";
import {Typography} from "@douyinfe/semi-ui";
import {sliceFIle, sliceFile2, sliceFIleByWorker} from "@/utils/sliceFIle";

interface Props {
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  //background: linear-gradient(#e66465, #9198e5);
`

const imageList = new Array(4).fill(0).map((_, index) => {
  return {
    id: index,
    url: `https://picsum.photos/150/100?random=${index}`,
  }
})
const Demo_SliceFile: React.FC<Props> = (props) => {


  useEffect(() => {
    const inputFile = document.querySelector('input[type="file"]')
    if (inputFile) {
      inputFile.onchange = async (e) => {
        const file = e.target.files[0]
        console.time('cutFile')

        const chunks = await sliceFIleByWorker(file)
        console.timeEnd('cutFile')
        console.log('chunks', chunks)
        console.time('cutFile2')
        const fileChunk = await sliceFile2(file)
        console.timeEnd('cutFile2')

        console.log('chunks2', fileChunk)
      }
    }
  }, [])
  return (
    <Wrapper >
      <Typography.Title style={{textAlign: 'center'}} heading={2}>Slice File</Typography.Title>

      <input type="file"/>

    </Wrapper>
  );
}
export default Demo_SliceFile;
