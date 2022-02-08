import { Avatar, Dropdown, Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CONSTANTS from '../../constants';
import AccountManagerRoutes from '../../router/AccountManagerRoutes';
import AdminRoutes from '../../router/AdminRoutes';
import HumanResourceRoutes from '../../router/HumanResourceRoutes';
import LeaderShipRoutes from '../../router/LeaderShipRoutes';
import ResourceManagerRoutes from '../../router/ResourceManagerRoutes';
import { Store } from '../../types/Redux';
import AccountManger from './menu/AccountMangerMenu';
import AdminMenu from './menu/AdminMenu';
import AvatarMenu from './menu/AvatarMenu';
import HumanResourceMenu from './menu/HumanResourceMenu';
import LeaderShipMenu from './menu/LeaderShipMenu';
import ResourceManagerMenu from './menu/ResourceManagerMenu';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function LayOut() {
  const [collapsed, setCollapsed] = useState(false);
  const [width, setwidth] = useState(window.innerWidth);
  const [current, setCurrent] = useState('1');
  const name: any = useSelector(
    (store: Store) => store.userSession.user?.username,
  );
  console.log(name[0]);
  const [color, setColor] = useState('red');
  const ROLE = useSelector((store: Store) => store.userSession.user?.role);
  const nav = useNavigate();
  const onCollapse = (collapsed: any) => {
    console.log(
      '🚀 ~ file: Layout.tsx ~ line 26 ~ onCollapse ~ collapsed',
      collapsed,
    );
    setCollapsed(collapsed);
  };
  useEffect(() => {
    let size = 700;
    if (window.innerWidth <= size) {
      setCollapsed(true);
    }
  }, [window.innerWidth]);
  const handleClick = (e: any) => {
    setCurrent(e.key);
  };

  function randomColor(): any {
    let hex = Math.floor(Math.random() * 0xffffff);
    let color = '#' + hex.toString(16);
    //setColor(color);
    return color;
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        theme="light"
        className="sidebar"
      >
        <div className="logo" />
        {(() => {
          switch (ROLE) {
            case CONSTANTS.ROLE[0]:
              return <AdminMenu collapsed={collapsed} />;

            case CONSTANTS.ROLE[1]:
              return <AccountManger collapsed={collapsed} />;

            case CONSTANTS.ROLE[2]:
              return <ResourceManagerMenu collapsed={collapsed} />;

            case CONSTANTS.ROLE[3]:
              return <HumanResourceMenu collapsed={collapsed} />;

            case CONSTANTS.ROLE[4]:
              return <LeaderShipMenu collapsed={collapsed} />;

            default:
              break;
          }
        })()}
      </Sider>
      <Layout className="site-layout" style={{ backgroundColor: '#FFFAF0' }}>
        <Header className="header head" style={{ backgroundColor: '#7CD0F5' }}>
          <div className="logo" />

          <Dropdown overlay={<AvatarMenu />} placement="bottomCenter" arrow>
            <Avatar
              size={45}
              style={{
                float: 'right',
                marginTop: '.5rem',
                color: 'white',
                cursor: 'pointer',
                backgroundColor: randomColor(),
              }}
            >
              {name[0].toUpperCase()}
            </Avatar>
          </Dropdown>
        </Header>

        <Content style={{ margin: '0 1rem', backgroundColor: '#FFFAF0' }}>
          {(() => {
            switch (ROLE) {
              case CONSTANTS.ROLE[0]:
                return <AdminRoutes />;

              case CONSTANTS.ROLE[1]:
                return <AccountManagerRoutes />;

              case CONSTANTS.ROLE[2]:
                return <ResourceManagerRoutes />;

              case CONSTANTS.ROLE[3]:
                return <HumanResourceRoutes />;

              case CONSTANTS.ROLE[4]:
                return <LeaderShipRoutes />;

              default:
                break;
            }
          })()}
        </Content>
        <Footer
          style={{
            //color: 'light',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            backgroundColor: '#fffaf0',
            // marginTop: '-1rem',
          }}
        >
          © Careator Technologies. All rights reserved
        </Footer>
      </Layout>
    </Layout>
  );
}

export default LayOut;
