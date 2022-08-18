import React from 'react';
import moment from 'moment';
import AdminGrid from 'components/layout/AdminGrid';
import { Table } from 'antd';
import { timeConversion, TypeManager } from 'utils';
import { v4 } from 'uuid';

const AdminMedicalListPresenter = ({ medicalList }) => {
  const columns = [
    {
      title: 'NO',
      dataIndex: 'idx',
      render: (value, row, idx) => {
        return idx + 1;
      },
    },
    {
      title: '고객명',
      dataIndex: 'customer_nm',
      render: (value, row) => {
        return value;
      },
    },
    {
      title: '접수시간',
      dataIndex: 'created_at',
      render: (value, row) => {
        return timeConversion(value * 1000, 'llll');
      },
    },
    {
      title: '대기시간',
      dataIndex: 'completed_at',
      render: (value, row, idx) => {
        const { created_at } = row;
        if (value) {
          return moment(value * 1000 - created_at * 1000);
        }
        return moment(moment() / 1000 - created_at) / 60 + '분';
      },
    },
    {
      title: '진료 상태',
      dataIndex: 'medical_status',
      render: (value, row, idx) => {
        return TypeManager.getStatusType(value).value;
      },
    },
  ];
  return (
    <AdminGrid>
      <div className="admin-company-list">
        <Table columns={columns} dataSource={medicalList} rowKey={() => v4()} />
      </div>
    </AdminGrid>
  );
};

export default AdminMedicalListPresenter;
