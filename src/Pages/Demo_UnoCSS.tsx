import React from "react";
import styled from "styled-components";

interface Props {
}

const Wrapper = styled.div`
    font-size: 4px !important;
`
const Demo_UnoCSS: React.FC<Props> = (props) => {
  const {...restProps} = props;
  return (
    <Wrapper className="px-16px py-40px text-center dark:text-white">
      <i className="i-logos-unocss text-48px inline-block"/>
      <p className="mt-15px text-20px font-bold color-gray-400">UnoCSS 指北</p>

      <p className="text-16px mt-15px inline-flex gap-10px">
        <i className="icon-btn dark:i-carbon-moon i-carbon-sun" />
        <a
          className="icon-btn i-carbon-logo-github"
          // href=""
          target="_blank"
          title="GitHub"
        />
      </p>

      <section className="mt-20px w-360px mx-auto flex flex-wrap justify-around p-10 card-shadow rounded-10px dark:card-border">
        <div className="w-50px h-50px card-border rounded-5px f-c-c p-10px m-20px">
          <span className="w-6px h-6px rounded-3px bg-black dark:bg-white"/>
        </div>
        <div className="w-50px h-50px card-border rounded-5px flex justify-between p-10px m-20px">
          <span className="w-6px h-6px rounded-3px bg-black dark:bg-white"/>
          <span className="w-6px h-6px rounded-3 self-end bg-black dark:bg-white"/>
        </div>
        <div className="w-50px h-50px card-border rounded-5px flex justify-between p-10px m-20px">
          <span className="w-6px h-6px rounded-3px bg-black dark:bg-white"/>
          <span className="w-6px h-6pxpx rounded-3px self-center bg-black dark:bg-white"/>
          <span className="w-6px h-6px rounded-3px self-end bg-black dark:bg-white"/>
        </div>
        <div className="w-50px h-50px card-border rounded-5px flex justify-between p-10px m-20px">
          <div className="flex-col justify-between">
            <span className="w-6px h-6px rounded-3px bg-black dark:bg-white"/>
            <span className="w-6px h-6px rounded-3px bg-black dark:bg-white"/>
          </div>
          <div className="flex-col justify-between">
            <span className="w-6px h-6px rounded-3px bg-black dark:bg-white"/>
            <span className="w-6px h-6px rounded-3px bg-black dark:bg-white"/>
          </div>
        </div>
        <div className="w-50px h-50px card-border rounded-5px flex-col justify-between items-center p-10px m-20px">
          <div className="flex w-full justify-between">
            <span className="w-6px h-6px rounded-3px bg-black dark:bg-white"/>
            <span className="w-6px h-6px rounded-3px bg-black dark:bg-white"/>
          </div>
          <div className="w-6px h-6px rounded-3px bg-black dark:bg-white" />
          <div className="flex w-full justify-between">
            <span className="w-6px h-6px rounded-3px bg-black dark:bg-white"/>
            <span className="w-6px h-6px rounded-3px bg-black dark:bg-white"/>
          </div>
        </div>
        <div className="w-50px h-50px card-border rounded-5px flex-col justify-between p-10px m-20px">
          <div className="flex w-full justify-between">
            <span className="w-6px h-6px rounded-3px bg-black dark:bg-white"/>
            <span className="w-6px h-6px rounded-3px bg-black dark:bg-white"/>
          </div>
          <div className="flex w-full justify-between">
            <span className="w-6px h-6px rounded-3px bg-black dark:bg-white"/>
            <span className="w-6px h-6px rounded-3px bg-black dark:bg-white"/>
          </div>
          <div className="flex w-full justify-between">
            <span className="w-6px h-6px rounded-3px bg-black dark:bg-white"/>
            <span className="w-6px h-6px rounded-3px bg-black dark:bg-white"/>
          </div>
        </div>
      </section>

      <p className="mt-20px text-14px color-gray-400">Flex骰子</p>
    </Wrapper>
  );
}
export default Demo_UnoCSS
