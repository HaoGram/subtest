import React, {PropsWithChildren} from 'react';
import { Layout, Nav, Button, Breadcrumb, Skeleton, Avatar } from '@douyinfe/semi-ui';
import { IconSemiLogo, IconBell, IconHelpCircle, IconBytedanceLogo, IconHome, IconHistogram, IconLive, IconSetting } from '@douyinfe/semi-icons';
import logo from "@/assets/icons/logo.png"
import {ThemeSwitcher} from '@/components/common/ThemeSwitcher';
import {LanguageSwitcher} from '@/components/LanguageSwitcher';
import styled from "styled-components";
import {Link} from "react-router-dom";
import {NavItems, SubNavPropsWithItems} from "@douyinfe/semi-ui/lib/es/navigation";

const Logo = styled.img`
  width: 30px;
  min-height: 100%;

`;
interface Props {}

const headMenus: NavItems = [
  {
    itemKey: 'Home',
    text: (
      <Link to={`/Examples`}>Example</Link>
    ),
    icon: <IconHome />
  },
  // {
  //   itemKey: '1',
  //   text: (
  //     <Link to={`/Page1`}>{`nav 1`}</Link>
  //   ),
  //   icon: <IconHistogram />
  // },
  {
    itemKey: '2',
    text: (
      <Link to={`/Page2`}>Map</Link>
    ),
    icon: <IconHistogram />
  },
  {
    itemKey: 'horizontal_scroll',
    text: (
      <Link to={`/frame/horizontal_scroll`}>HorizontalScroll</Link>
    ),
    icon: <IconHistogram />
  },
]
export const LayoutWrapper: React.FC<Props> = ({children}: PropsWithChildren<Props>) => {
  const { Header, Footer, Sider, Content } = Layout;
  return (
    <Layout style={{ border: '1px solid var(--semi-color-border)' }}>
      <Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
        <div>
          <Nav
            mode="horizontal"
            defaultSelectedKeys={['Home']}
            items={headMenus as NavItems}
            onSelect={key => console.log(key)}
          >
            <Nav.Header>
              <Logo src={logo}  />
            </Nav.Header>
            <Nav.Footer>

              <ThemeSwitcher/>
              <LanguageSwitcher/>

            </Nav.Footer>
          </Nav>
        </div>
      </Header>
      <Layout style={{height: 'calc(100vh - 62px)'}}>
        <Sider style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
          <Nav
            style={{ maxWidth: 220, height: '100%' }}
            // defaultSelectedKeys={['Home']}
            items={[
              { itemKey: 'Home', text: 'Home', icon: <IconHome size="large" /> },
              { itemKey: 'Histogram', text: 'Map', icon: <IconHistogram size="large" /> },
              // { itemKey: 'Live', text: '测试功能', icon: <IconLive size="large" /> },
              // { itemKey: 'Setting', text: '设置', icon: <IconSetting size="large" /> },
            ]}
            defaultIsCollapsed={true}
            footer={{
              collapseButton: true,
              // collapseText: (collapsed) => collapsed ? 'Expand' : '',
            }}
          />
        </Sider>
        <Content
          style={{
            padding: '24px',
            backgroundColor: 'var(--semi-color-bg-0)',
          }}
        >

          {children}
        </Content>
      </Layout>

    </Layout>
  );
};
