import React from 'react';
import { Table } from 'antd';

const MedicalTable = ({ columns, list, scroll, onClick }) => {
  return (
    <Table
      bordered
      columns={columns}
      dataSource={list}
      onRow={(item) => {
        return { onClick: () => onClick(item) };
      }}
      pagination={false}
      scroll={{ y: '90vh' }}
      style={{
        width: '100%',
        minHeight: '100%',
        background: 'white',
        textAlign: 'center',
      }}
    />
  );
};

MedicalTable.defaultProps = {
  columns: [],
  list: [],
  onClick: () => {},
  pagination: false,
  scroll: window.innerHeight * 0.8,
};

export default MedicalTable;
