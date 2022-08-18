import React, { useState } from 'react';
import moment from 'moment';
import { Button, Table, Typography } from 'antd';
import { AdminGrid } from 'components';
import './company-member-info.css';
import { PlusOutlined } from '@ant-design/icons';
import { MemberRegist } from './components';
import { TypeManager } from 'utils';

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
    title: '사원명',
    dataIndex: 'member_nm',
    render: (val, arr) => {
      return val;
    },
  },
  {
    title: '부서',
    dataIndex: 'dept_nm',
    render: (val, arr) => {
      return val;
    },
  },
  {
    title: '사원 권한',
    dataIndex: 'member_div',
    render: (val, arr) => {
      const { value } = TypeManager.getMemberDiv(val);
      return value;
    },
  },
  {
    title: '입사일',
    dataIndex: 'created_at',
    render: (val, arr) => {
      return moment(val * 1000).format('llll');
    },
  },
];

const CompanyMemberInfoPresenter = ({
  memberList,
  deptList,
  setMemberDept,
  insertMember,
  updateMember,
}) => {
  const [visible, setVisible] = useState(false);
  const [memberInfo, setMemberInfo] = useState({});
  const [update, setUpdate] = useState(false);

  const onUpdate = (member) => {
    setMemberInfo(member);
    setUpdate(true);
    setVisible(true);
  };
  const handleOpen = () => {
    setUpdate(false);
    setVisible(true);
  };

  const handleInsertMember = async () => {
    return await insertMember(memberInfo);
  };
  const handleUpdateMember = async () => {
    setUpdate(false);
    return await updateMember(memberInfo);
  };

  return (
    <AdminGrid>
      <div className="company-member-info-container">
        <Title level={5} className="title">
          직원 정보{' '}
          <Button onClick={handleOpen}>
            직원 추가
            <PlusOutlined />
          </Button>
        </Title>
        <Table
          columns={columns}
          dataSource={memberList}
          onRow={(record) => {
            return { onClick: () => onUpdate(record) };
          }}
        />
      </div>
      <MemberRegist
        visible={visible}
        setVisible={setVisible}
        memberInfo={memberInfo}
        setMemberInfo={setMemberInfo}
        update={update}
        deptList={deptList}
        setMemberDept={setMemberDept}
        insertMember={handleInsertMember}
        updateMember={handleUpdateMember}
      />
    </AdminGrid>
  );
};

export default CompanyMemberInfoPresenter;
