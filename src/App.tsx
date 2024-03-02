import 'antd/dist/reset.css';
import {LayoutWrapper} from '@/components/LayoutWrapper';
import {Router} from '@/Router';
import {Outlet} from "react-router-dom";

export const App = () => (
  <LayoutWrapper>
    <Outlet />
  </LayoutWrapper>
);
