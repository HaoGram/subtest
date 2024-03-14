import {createHashRouter, Navigate, RouterProvider} from 'react-router-dom';
import {Page1} from '@/Pages/Page1';
import {Page2} from '@/Pages/Page2';
import {Examples} from "@/Pages/Examples";
import {App} from "@/App";
import {HtmlFrame} from "@/components/HtmlFrame";
import {Demo_ImageBackground} from "@/components/Demo_ImageBackground.tsx";
import {Demo_VideoFrame} from "@/components/Demo_VideoFrame.tsx";
import {Demo_FfmpegDemo} from "@/components/Demo_FfmpegDemo.tsx";
import {Demo_UnoCSS} from "@/components/Demo_UnoCSS.tsx";

export const routers = createHashRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Navigate to="/Examples"/>
      },
      {
        path: "/Page1",
        element: <Page1/>
      },
      {
        path: "/Page2",
        element: <Page2/>
      },
      {
        path: "/Examples",
        element: <Examples/>,
        children: [

          {
            path: '/Examples/VideoFrame',
            element: <Demo_VideoFrame/>
          },
          {
            path: 'ImageBackground',
            element: <Demo_ImageBackground/>
          },
          {
            path: 'FfmpegDemo',
            element: <Demo_FfmpegDemo/>
          },
          {
            path: 'unocss',
            element: <Demo_UnoCSS />
          }
        ]
      },
      {
        path: "/frame/:dirName",
        element: <HtmlFrame/>
      }
    ]
  },

]);

export const Router = () => (
  <RouterProvider router={routers} ></RouterProvider>
);
