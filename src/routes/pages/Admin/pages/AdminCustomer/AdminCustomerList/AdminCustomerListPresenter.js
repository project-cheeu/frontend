import React from 'react';
import { Switch, Table } from 'antd';
import AdminGrid from 'components/layout/AdminGrid';
import { timeConversion } from 'utils';
import { v4 } from 'uuid';
const AdminCustomerListPresenter = ({ customerList }) => {
  const columns = [
    {
      title: 'NO',
      dataIndex: 'idx',
      render: (value, row, idx) => {
        return idx + 1;
      },
    },

    {
      title: '사용자명',
      dataIndex: 'customer_nm',
      render: (value, row) => {
        return value;
      },
    },
    {
      title: '거주지',
      dataIndex: 'customer_addr',
      render: (value, row, idx) => {
        return value;
      },
    },
    {
      title: '가입일',
      dataIndex: 'created_at',
      render: (value, row, idx) => {
        return timeConversion(value * 1000, 'll');
      },
    },
    {
      title: '전화번호',
      dataIndex: 'customer_tel',
      render: (value, row, idx) => {
        return value;
      },
    },
    {
      title: '사용 여부',
      dataIndex: 'customer_yn',
      render: (value, row, idx) => {
        return <Switch checked={value} />;
      },
    },
  ];
  return (
    <AdminGrid>
      <div className="admin-company-list">
        <Table
          columns={columns}
          dataSource={customerList}
          rowKey={() => v4()}
        />
      </div>
    </AdminGrid>
  );
};

export default AdminCustomerListPresenter;
