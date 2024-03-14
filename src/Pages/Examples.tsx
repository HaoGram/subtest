import React from "react";
import {Link, Outlet} from "react-router-dom";
import styled from "styled-components";


interface Props {
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`
export const Examples: React.FC<React.PropsWithChildren<Props>> = (props) => {
    const {children, ...restProps} = props;
    const menuList = [
      {
        label: 'VideoFrame',
        path: '/Examples/VideoFrame'
      },
      {
        label: 'ImageBackground',
        path: '/Examples/ImageBackground'
      },
      {
        label: 'FfmpegDemo',
        path: '/Examples/FfmpegDemo'
      },
      {
        label: 'unocss',
        path: '/Examples/unocss'
      }
    ]
  console.log('children', children)
    return (
      <Wrapper {...restProps}>
        <div className={'flex mb-5 gap-2'}>
          {
            menuList.map((item, i) => {
              return <Link key={i} to={item.path}>{item.label}</Link>
            })
          }
        </div>
        <Outlet/>
      </Wrapper>
    );
}
