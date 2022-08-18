import React from 'react';
import moment from 'moment';
import { Button, Switch, Table, Typography } from 'antd';
import './dept-display.css';
import { PlusOutlined } from '@ant-design/icons';
const { Title } = Typography;

const columns = [
  {
    title: 'NO',
    dataIndex: 'idx',
    render: (a, b, idx) => {
      return idx + 1;
    },
  },
  {
    title: '부서명',
    dataIndex: 'dept_nm',
    render: (val, arr) => {
      return val;
    },
  },
  {
    title: '부서 담당자',
    dataIndex: 'dept_manager',
    render: (val, arr) => {
      return val;
    },
  },
  {
    title: '부서 생성일',
    dataIndex: 'created_at',
    render: (val, arr) => {
      return moment(val * 1000).format('llll');
    },
  },
  {
    title: '부서 사용 여부',
    dataIndex: 'dept_yn',
    render: (val, arr) => {
      return <Switch checked={val} />;
    },
  },
];

const DeptDisplay = ({ dept, setVisible, updateTrigger }) => {
  return (
    <div className="dept-display-container">
      <Title level={5} className="title">
        부서 정보{' '}
        <Button onClick={setVisible}>
          부서 추가
          <PlusOutlined />
        </Button>
      </Title>
      <Table
        columns={columns}
        dataSource={dept}
        pagination={false}
        onRow={(record) => {
          return { onClick: () => updateTrigger(record) };
        }}
      />
    </div>
  );
};

DeptDisplay.defaultProps = {
  dept: 'Dept',
};

export default DeptDisplay;
