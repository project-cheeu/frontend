import { Table } from 'antd';
import { AdminGrid } from 'components';
import React from 'react';
const columns = [
  {
    title: '번호',
    dataIndex: 'idx',
    render: (val, obj, idx) => {
      return idx + 1;
    },
  },
  {
    title: '이름',
    dataIndex: 'customer_nm',
    render: (val, obj, idx) => {
      return val;
    },
  },
  {
    title: '전화번호',
    dataIndex: 'customer_tel',
    render: (val, obj, idx) => {
      return val;
    },
  },
  {
    title: '주소',
    dataIndex: 'customer_addr',
    render: (val, obj, idx) => {
      return val;
    },
  },
  {
    title: '내원횟수',
    dataIndex: 'medical_count',
    render: (val, obj, idx) => {
      return val;
    },
  },
];

const CustomerListPresenter = ({ customerList }) => {
  return (
    <AdminGrid>
      <Table columns={columns} dataSource={customerList} />
    </AdminGrid>
  );
};

export default CustomerListPresenter;
