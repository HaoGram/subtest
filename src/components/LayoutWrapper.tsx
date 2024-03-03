import React, {PropsWithChildren} from 'react';
import {Breadcrumb, Menu, MenuProps, Layout} from 'antd';
import {T} from '@/components/common/Translate';
import {LanguageSwitcher} from '@/components/LanguageSwitcher';
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import styled from 'styled-components';
import {useIntl} from 'react-intl';
import {Link} from 'react-router-dom';
import {ThemeSwitcher} from '@/components/common/ThemeSwitcher';
import logo from "@/assets/icons/logo.png"
const { Header, Content, Footer, Sider } = Layout;

const hearMenus: MenuProps['items'] = [
  {
    key: 'Example',
    label: (
      <Link to={`/Examples`}>Example</Link>
    ),
  },
  {
    key: '1',
    label: (
      <Link to={`/Page1`}>{`nav 1`}</Link>
    ),
  },
  {
    key: '2',
    label: (
      <Link to={`/Page2`}>{`nav 2`}</Link>
    ),
  },
]

const Logo = styled.img`
  float: left;
  width: 30px;
  //height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
`;

interface Props {

}

export const LayoutWrapper: React.FC<Props> = ({children}: PropsWithChildren<Props>) => {
  const {
    formatMessage
  } = useIntl();

  const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
      const key = String(index + 1);

      return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: formatMessage({id: 'subnav {value}'}, {value: key}),

        children: new Array(4).fill(null).map((_, j) => {
          const subKey = index * 4 + j + 1;
          return {
            key: subKey,
            label: formatMessage({id: 'option {value}'}, {value: subKey}),
          };
        }),
      };
    },
  );

  return (
    <Layout>
      <Header>
        <Logo src={logo} alt=""/>
        {/*<LanguageSwitcher/>*/}
        <ThemeSwitcher/>
        <Menu mode="horizontal" defaultSelectedKeys={[String(hearMenus[0]?.key)]} items={hearMenus} style={{background: 'transparent'}} />
      </Header>
        <Layout className="site-layout-background">

            <Layout style={{ padding: '0 24px 24px' }}>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    {children}
                </Content>
            </Layout>

        </Layout>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  )
}
