import { Switch, Table } from 'antd';
import AdminGrid from 'components/layout/AdminGrid';
import React from 'react';
import { timeConversion } from 'utils';
import { v4 } from 'uuid';
import './AdminCompanyList.css';
const columns = [
  {
    title: 'NO',
    dataIndex: 'idx',
    render: (value, row, idx) => {
      return idx + 1;
    },
  },
  {
    title: '사용여부',
    dataIndex: 'use_yn',
    render: (value, row, idx) => {
      return <Switch checked={value} />;
    },
  },
  {
    title: '회사명',
    dataIndex: 'company_nm',
    render: (value, row) => {
      return value;
    },
  },
  {
    title: '사원수',
    dataIndex: 'member_count',
    render: (value, row, idx) => {
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
  {
    title: '최근 수정일',
    dataIndex: 'modified_at',
    render: (value, row, idx) => {
      return timeConversion(value * 1000, 'll');
    },
  },
];

const AdminCompanyListPresenter = ({ companyList }) => {
  return (
    <AdminGrid>
      <div className="admin-company-list">
        <Table columns={columns} dataSource={companyList} rowKey={() => v4()} />
      </div>
    </AdminGrid>
  );
};

export default AdminCompanyListPresenter;
