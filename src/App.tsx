import {LayoutWrapper} from '@/components/LayoutWrapper';
import {Outlet} from "react-router-dom";

export const App = () => (
  <LayoutWrapper>
    <Outlet />
  </LayoutWrapper>
);
