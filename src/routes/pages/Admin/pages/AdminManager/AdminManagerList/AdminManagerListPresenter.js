import React from 'react';
import { Table } from 'antd';
import AdminGrid from 'components/layout/AdminGrid';
import { timeConversion } from 'utils';
import { v4 } from 'uuid';

const AdminManagerListPresenter = ({ managerList }) => {
  const columns = [
    {
      title: 'NO',
      dataIndex: 'idx',
      render: (value, row, idx) => {
        return idx + 1;
      },
    },
    {
      title: '관리자명',
      dataIndex: 'manager_nm',
      render: (value, row) => {
        return value;
      },
    },
    {
      title: '로그인 아이디',
      dataIndex: 'manager_login_id',
      render: (value, row) => {
        return value;
      },
    },
    {
      title: '생성일',
      dataIndex: 'created_at',
      render: (value, row, idx) => {
        return timeConversion(value * 1000, 'll');
      },
    },
  ];
  return (
    <AdminGrid>
      <div className="admin-company-list">
        <Table columns={columns} dataSource={managerList} rowKey={() => v4()} />
      </div>
    </AdminGrid>
  );
};

export default AdminManagerListPresenter;
