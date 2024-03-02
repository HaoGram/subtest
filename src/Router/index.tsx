import {createHashRouter, Navigate, RouterProvider} from 'react-router-dom';
import {Page1} from '@/Pages/Page1';
import {Page2} from '@/Pages/Page2';
import {Examples} from "@/Pages/Examples";
import {App} from "@/App";


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
        element: <Examples/>
      }
    ]
  },

]);

export const Router = ({children}) => (
  <RouterProvider router={routers} >{children}</RouterProvider>
);
