import React from "react";
import styled from "styled-components";
import {ImageBackground} from "@/components/ImageBackground";

interface Props {
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`
export const Examples: React.FC<Props> = (props) => {
    const {...restProps} = props;
    return (
        <Wrapper {...restProps}>
          <ImageBackground />
        </Wrapper>
    );
}
