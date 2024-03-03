import React, {useMemo} from "react";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import {Typography} from "@douyinfe/semi-ui";
import {PUBLIC_PROJECT_LIST} from "@/constants";

const {Title} = Typography;

interface Props {
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  iframe {
    width: 100%;
    height: 100%;
    background-color: var(--semi-color-fill-0);
  }
`


export const HtmlFrame: React.FC<Props> = (props) => {
  const {...restProps} = props;
  const params = useParams()
  console.log('params', params, PUBLIC_PROJECT_LIST)
  const curProject  = useMemo(() => {
    return PUBLIC_PROJECT_LIST.find(item => item.dirName === params.dirName)
  }, [params])
  console.log('curProject', curProject)
  return (
    <Wrapper {...restProps}>
      <Title heading={2}>
        HorizontalScroll
      </Title>
      <iframe src={curProject ? `./${curProject?.path}` : ''} frameBorder="0"></iframe>
    </Wrapper>
  );
}
