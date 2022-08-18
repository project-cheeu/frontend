import React from 'react';
import { Layout, Menu } from 'antd';
import {
  PieChartOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  CommentOutlined,
  TeamOutlined,
  FieldTimeOutlined,
} from '@ant-design/icons';
import LOGO from 'assets/logo.png';
import { did_url } from 'utils';
import { useAppState } from 'context/MainContext';

const { Sider } = Layout;
const { SubMenu } = Menu;

const DesktopSider = ({ activePage, collapsed, onCollapse, onChangePage }) => {
  /* Router */
  /* State */
  const { company } = useAppState();
  const { company_id } = company;
  const menus = [
    {
      key: '/d',
      icon: <CalendarOutlined />,
      name: '진료현황판',
    },
    {
      key: 'company',
      icon: <EnvironmentOutlined />,
      name: '병원관리',
      sub: [
        {
          subKey: '/d/company',
          subName: '병원 정보',
        },
        {
          subKey: '/d/company/dept',
          subName: '부서 관리',
        },
        {
          subKey: '/d/company/member',
          subName: '직원 관리',
        },
      ],
    },
    {
      key: 'customer',
      icon: <TeamOutlined />,
      name: '고객관리',
      sub: [
        {
          subKey: '/d/customer',
          subName: '고객 등록',
        },
        {
          subKey: '/d/customer/list',
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
          subKey: '/d/medical',
          subName: '문진 리스트',
        },
        // {
        //   subKey: '/d/medical/reservation',
        //   subName: '예약 관리',
        // },
        {
          subKey: '/d/survey',
          subName: '설문 관리',
        },
        {
          subKey: '/d/medical/agreement',
          subName: '동의서 관리',
        },
      ],
    },
    {
      key: 'statistics',
      icon: <PieChartOutlined />,
      name: '통계관리',
      sub: [
        {
          subKey: '/d/statistics/customer',
          subName: '환자 통계',
        },
        {
          subKey: '/d/statistics/survey',
          subName: '설문 통계',
        },
      ],
    },
    {
      key: 'alimtalk',
      icon: <CommentOutlined />,
      name: '알림톡 관리',
      sub: [
        {
          subKey: '/d/alimtalk',
          subName: '알림톡 조회',
        },
      ],
    },
    {
      key: 'wating',
      icon: <FieldTimeOutlined />,
      name: 'DID 관리',
      sub: [
        {
          subKey: '/d/wating',
          subName: 'DID 관리',
        },
        {
          subKey: '/d',
          subName: 'DID 이동',
          redirect: `${did_url}/${company_id}`,
        },
      ],
    },
  ];
  /* Hooks */
  /* Functions */
  /* Render */
  const menuItem = menus.map((item) => {
    const { key, icon, name, sub } = item;
    if (sub) {
      return (
        <SubMenu key={key} icon={icon} title={name}>
          {sub.map((subItem) => {
            const { subKey, subName, redirect } = subItem;
            return (
              <Menu.Item
                key={subKey}
                onClick={() => onChangePage(subKey, subName, redirect)}
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
        theme="dark"
        selectedKeys={[activePage]}
        mode="inline"
        defaultSelectedKeys={activePage}
      >
        {menuItem}
      </Menu>
    </Sider>
  );
};

export default DesktopSider;
