import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Layout, Avatar } from 'antd';

const { Header } = Layout;

const DesktopHeader = ({ pageTitle, member, logout }) => {
  const { member_nm } = member;
  return (
    <Header className="site-layout-background" style={{ padding: '0px 30px' }}>
      <div style={{ float: 'left' }}>
        <h1>{pageTitle}</h1>
      </div>
      <div style={{ float: 'right' }}>
        <>
          <Avatar icon={<UserOutlined />} style={{ marginRight: '10px' }} />
          <span style={{ marginRight: '20px' }}>{member_nm}</span>
          <span className="site-header-logout" onClick={logout}>
            ๋ก๊ทธ์์
          </span>
        </>
      </div>
    </Header>
  );
};

export default DesktopHeader;
