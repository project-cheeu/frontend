import React from 'react';
import { Layout, Menu } from 'antd';
import {
  PieChartOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import LOGO from 'assets/logo.png';

const { Sider } = Layout;
const { SubMenu } = Menu;

const menus = [
  {
    key: '/a',
    icon: <CalendarOutlined />,
    name: '대시보드',
  },
  {
    key: 'company',
    icon: <EnvironmentOutlined />,
    name: '병원관리',
    sub: [
      {
        subKey: '/a/company',
        subName: '병원 등록',
      },
      {
        subKey: '/a/company/list',
        subName: '병원 리스트',
      },
    ],
  },
  {
    key: 'customer',
    icon: <TeamOutlined />,
    name: '고객관리',
    sub: [
      {
        subKey: '/a/customer',
        subName: '고객 등록',
      },
      {
        subKey: '/a/customer/list',
        subName: '고객 리스트',
      },
    ],
  },
  {
    key: 'medical',
    icon: <PieChartOutlined />,
    name: '문진관리',
    sub: [
      {
        subKey: '/a/medical',
        subName: '문진 리스트',
      },
      {
        subKey: '/a/medical/status',
        subName: '진료 코드 관리',
      },
      {
        subKey: '/a/survey',
        subName: '설문 관리',
      },
    ],
  },
  {
    key: 'manager',
    icon: <ToolOutlined />,
    name: '매니저 관리',
    sub: [
      {
        subKey: '/a/manager',
        subName: '매니저 등록',
      },
      {
        subKey: '/a/manager/list',
        subName: '매니저 리스트',
      },
    ],
  },
];

const AdminSider = ({ activePage, collapsed, onCollapse, onChangePage }) => {
  const menuItem = menus.map((item) => {
    const { key, icon, name, sub } = item;
    if (sub) {
      return (
        <SubMenu key={key} icon={icon} title={name}>
          {sub.map((subItem) => {
            const { subKey, subName } = subItem;
            return (
              <Menu.Item
                key={subKey}
                onClick={() => onChangePage(subKey, subName)}
              >
                {subName}
              </Menu.Item>
            );
          })}
        </SubMenu>
      );
    } else {
      return (
        <Menu.Item
          key={key}
          icon={icon}
          onClick={() => onChangePage(key, name)}
        >
          {name}
        </Menu.Item>
      );
    }
  });
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      style={{ display: 'block' }}
      theme="light"
    >
      <div
        className="logo"
        style={{
          height: '32px',
          margin: '16px',
          textAlign: 'center',
        }}
      >
        <img src={LOGO} alt="logo" style={{ height: '100%' }} />
      </div>
      <Menu
        theme="light"
        selectedKeys={[activePage]}
        mode="inline"
        defaultSelectedKeys={activePage}
      >
        {menuItem}
      </Menu>
    </Sider>
  );
};

export default AdminSider;
