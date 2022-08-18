import React from 'react';
import { v4 } from 'uuid';
import { Table } from 'antd';

const SurveyCompanyListPresenter = ({ companyList, selectCompany }) => {
  const columns = [
    {
      title: 'NO',
      dataIndex: 'idx',
      render: (value, row, idx) => {
        return idx + 1;
      },
    },
    {
      title: '회사명',
      dataIndex: 'company_nm',
      render: (value, row) => {
        return value;
      },
    },
  ];
  return (
    <div className="admin-company-list">
      <Table
        columns={columns}
        onRow={(item) => {
          // const {item.company_id}  = item;
          return { onClick: () => selectCompany(item.company_id) };
        }}
        dataSource={companyList}
        rowKey={() => v4()}
      />
    </div>
  );
};

export default SurveyCompanyListPresenter;
