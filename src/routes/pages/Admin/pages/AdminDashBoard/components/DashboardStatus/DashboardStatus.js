import React, { useState } from 'react';
import moment from 'moment';
import { Card, Col, Row, Table } from 'antd';
import { DashboardCard } from 'components';
import { TypeManager } from 'utils';
import Modal from 'antd/lib/modal/Modal';
import DashboardMedicalDetail from './DashboardMedicalDetail';

const columns = [
  {
    title: '번호',
    dataIndex: 'idx',
    render: (val, obj, idx) => {
      return idx + 1;
    },
  },
  {
    title: '병원명',
    dataIndex: 'company_nm',
    render: (val, obj, idx) => {
      return val;
    },
  },
  {
    title: '상태',
    dataIndex: 'medical_status',
    render: (val, obj, idx) => {
      const { value } = TypeManager.getStatusType(val);
      return value;
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
    title: '대기시간',
    dataIndex: 'completed_at',
    render: (val, obj, idx) => {
      const { created_at } = obj;
      if (val) {
        return moment(val * 1000 - created_at * 1000);
      }
      return moment(created_at * 1000)
        .startOf()
        .fromNow('w');
    },
  },
  {
    title: '접수일시',
    dataIndex: 'created_at',
    render: (val, obj, idx) => {
      return moment(val * 1000).format('llll');
    },
  },
];

const DashboardStatus = ({
  medicalList,
  medicalDetail,
  dashboard,
  onClick,
}) => {
  const [modal, setModal] = useState(false);

  const handleOnClick = async (item) => {
    await onClick(item);
    await setModal(true);
  };

  const status =
    dashboard &&
    dashboard.map((item) => {
      const { medical_status, status_count } = item;

      return (
        <Col span={6}>
          <Card title={medical_status}>
            <DashboardCard text={`${status_count}명`} />
          </Card>
        </Col>
      );
    });

  return (
    <div className="admin-company-list">
      <Row gutter={[10, 10]}>
        {status}
        <Col span={24}>
          <Card title={'접수 현황'}>
            <Table
              columns={columns}
              dataSource={medicalList}
              onRow={(item) => {
                return { onClick: () => handleOnClick(item) };
              }}
              style={{ width: '100%', height: '100%' }}
            />
          </Card>
        </Col>
      </Row>
      <Modal
        centered
        title="진료 상세보기"
        width={'70vw'}
        bodyStyle={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
        visible={modal}
        onCancel={() => setModal(false)}
        footer
      >
        <DashboardMedicalDetail medicalDetail={medicalDetail} />
      </Modal>
    </div>
  );
};

export default DashboardStatus;
