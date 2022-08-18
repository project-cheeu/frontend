import React from 'react';
import { Descriptions, Input } from 'antd';
import AdminGrid from 'components/layout/AdminGrid';

const AdminManagerRegisterPresenter = ({ adminInfo, setAdminInfo }) => {
  return (
    <AdminGrid>
      <div style={{ padding: '1%' }}>매니저 정보를 등록합니다.</div>
      <div className="admin-company-submit">
        <Descriptions bordered>
          <Descriptions.Item label="매니저명" span={4}>
            <Input
              name="manager_nm"
              value={adminInfo.manager_nm}
              onChange={(e) =>
                setAdminInfo({
                  ...adminInfo,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </Descriptions.Item>
          <Descriptions.Item label="매니저 로그인 아이디" span={4}>
            <Input
              name="manager_login_id"
              value={adminInfo.manager_login_id}
              onChange={(e) =>
                setAdminInfo({
                  ...adminInfo,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </Descriptions.Item>
          <Descriptions.Item label="매니저 로그인 비밀번호" span={4}>
            <Input
              name="manager_login_pw"
              value={adminInfo.manager_login_pw}
              onChange={(e) =>
                setAdminInfo({
                  ...adminInfo,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </Descriptions.Item>
          <Descriptions.Item label="매니저 핀 비밀번호" span={4}>
            <Input
              name="manager_pin"
              value={adminInfo.manager_pin}
              onChange={(e) =>
                setAdminInfo({
                  ...adminInfo,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </Descriptions.Item>
        </Descriptions>
      </div>
    </AdminGrid>
  );
};

export default AdminManagerRegisterPresenter;
