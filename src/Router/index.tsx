import {
  createHashRouter,
  isRouteErrorResponse,
  Link,
  Navigate,
  RouteObject,
  RouterProvider,
  useRouteError
} from 'react-router-dom';
import {Page1} from '@/Pages/Page1';
import {Page2} from '@/Pages/Page2';
import {Examples} from "@/Pages/Examples";
import {App} from "@/App";
import {HtmlFrame} from "@/components/HtmlFrame";

import {lazy, ReactNode, Suspense} from "react";


function NoMatch() {
  return (
    <div>
      <h2>It looks like you're lost...</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
// 路由懒加载
const routerLazyLoadingFn = (Element: React.LazyExoticComponent<React.ComponentType<any>>) => <Suspense fallback={<>loading...</>}>
  <Element />
</Suspense>


const UElement = lazy(() => import("@/Pages/Demo_UnoCSS.tsx"))

const VideoElement = lazy(() => import("@/Pages/Demo_VideoFrame.tsx"))

const demoRoutes: RouteObject[] = []
const files = import.meta.glob('../Pages/Demo_*.tsx');
for (let i in files) {
  // console.log(123, i, files[i]);
  const curFile = files[i]
  const fileName = i.replace(/..\/Pages\//, '').replace(/.tsx/, '');

  // const upperName = newName.replace(/([A-Z])/g," $1").slice(1)
  const upperName = fileName.replace('Demo_', '')

  const pathName = upperName.toLocaleLowerCase()
  // console.log('curFile', typeof curFile, curFile)
  const element = routerLazyLoadingFn(lazy(curFile as any))
  demoRoutes.push({
    path: '' + upperName,
    element,
    // name: upperName,
  })
}

// console.log('files', files, demoRoutes)
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

          ...demoRoutes,

          // {
          //   path: 'ImageBackground',
          //   element: <Demo_ImageBackground/>
          // },
          // {
          //   path: 'FfmpegDemo',
          //   element: <Demo_FfmpegDemo/>
          // },

        ]
      },
      {
        path: "/frame/:dirName",
        element: <HtmlFrame/>
      },
      { path: "*", element: <NoMatch /> },
    ]
  },
], {
  basename: import.meta.env.BASE_URL,
});


export const Router = () => (
  <RouterProvider router={routers} ></RouterProvider>
);
