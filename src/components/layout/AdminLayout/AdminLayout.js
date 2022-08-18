import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import './components/admin_layout.css';

import { useHistory } from 'react-router-dom';
import { useAppDispatch } from 'context/MainContext';
import { ADMIN_PAGE } from 'context/MainReducer';
import { getCookie } from 'utils';
import { AdminHeader, AdminSider } from './components';

const { Content } = Layout;

const AdminLayout = ({ children, admin, logout }) => {
  const [pages, setPages] = useState({ path: '/a', name: '대시보드' });
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    getPageInfo();
    return () => {
      setPageInfo(false);
    };
    // eslint-disable-next-line
  }, []);

  const getPageInfo = async () => {
    const page = await JSON.parse(getCookie('page'));
    if (page) {
      const { path } = page;
      await setPageInfo(page);
      await history.push(path);
    }
  };

  const setPageInfo = (pageInfo) => {
    dispatch({ type: ADMIN_PAGE, payload: pageInfo });
    setPages(pageInfo);
  };

  const onCollapse = (val) => {
    setCollapsed(val);
  };

  const onChangePage = (path, name) => {
    setPageInfo({ path, name });
    history.push(path);
  };

  return (
    admin && (
      <Layout className="site-layout-container">
        <AdminSider
          activePage={pages.path}
          collapsed={collapsed}
          onCollapse={onCollapse}
          onChangePage={onChangePage}
        />
        <Layout className="site-layout">
          <AdminHeader pageTitle={pages.name} admin={admin} logout={logout} />
          <Content style={{ margin: '0 16px', padding: '10px 10px 10px 10px' }}>
            {children}
          </Content>
          {/* <Footer>&copy;Codebrewing All reserved</Footer> */}
        </Layout>
      </Layout>
    )
  );
};

export default AdminLayout;
