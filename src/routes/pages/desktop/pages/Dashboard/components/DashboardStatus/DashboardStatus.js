import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Card, Col, Input, Row, Table } from 'antd';
import { DashboardCard } from 'components';
import { MessageAlert, TypeManager } from 'utils';
import { CustomerModal } from 'components/layout';
import { URMedicalApi } from 'api';
import Hangul from 'hangul-js';

const columns = [
  {
    title: '번호',
    dataIndex: 'idx',
    render: (val, obj, idx) => {
      return idx + 1;
    },
  },
  // {
  //   title: '병원명',
  //   dataIndex: 'company_nm',
  //   render: (val, obj, idx) => {
  //     return val;
  //   },
  // },

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
    title: '상태',
    dataIndex: 'medical_status',
    render: (val, obj, idx) => {
      const { value, color } = TypeManager.getStatusType(val);
      return <span style={{ color }}>{value}</span>;
    },
  },
  {
    title: '대기시간',
    dataIndex: 'completed_at',
    render: (completed_at, obj, idx) => {
      const { created_at } = obj;
      if (completed_at) {
        return parseInt((completed_at - created_at) / 60) + '분';
      }
      return parseInt(moment(moment() / 1000 - created_at) / 60) + '분';
    },
  },
  {
    title: '접수일시',
    dataIndex: 'created_at',
    render: (val, obj, idx) => {
      return moment(val * 1000).format('hh:mm');
    },
  },
];

const DashboardStatus = ({
  medicalList,
  medicalDetail,
  dashboard,
  onClick,
  setMedicalDetail,
  getMedicalStatus,
}) => {
  /* Router */
  /* State */
  const [modal, setModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('Total');
  const [filterList, setFilterList] = useState(medicalList);
  const [search, setSearch] = useState('');
  /* Hooks */
  useEffect(() => {
    if (filterStatus === 'Total') {
      setFilterList(medicalList);
    } else {
      const temp = medicalList.filter((item) => {
        const { medical_status } = item;
        const { value } = TypeManager.getStatusType(medical_status);
        return value === filterStatus;
      });
      setFilterList(temp);
    }
  }, [filterStatus, medicalList]);

  useEffect(() => {
    if (search === '') {
      setFilterList(medicalList);
    } else {
      const search1 = Hangul.disassemble(search).join('');
      const temp = medicalList.filter((item) => {
        const { customer_nm, customer_num, customer_tel } = item;
        return (
          customer_nm.includes(search1) ||
          customer_nm.includes(search) ||
          customer_num.includes(search) ||
          customer_tel.includes(search)
        );
      });
      setFilterList(temp);
    }
    // eslint-disable-next-line
  }, [search]);
  /* Functions */

  const handleOnClick = async (item) => {
    await onClick(item);
    await setModal(true);
  };

  const status =
    dashboard &&
    dashboard.map((item) => {
      const { medical_status, status_count, color } = item;

      return (
        <Col span={11}>
          <Card
            style={{
              filter: medical_status === filterStatus && 'invert(100%)',
              textAlign: 'center',
            }}
            bodyStyle={{ padding: '5%' }}
            title={medical_status}
            onClick={() => setFilterStatus(medical_status)}
          >
            <DashboardCard text={`${status_count}명`} color={color} />
          </Card>
        </Col>
      );
    });

  const handleChangeStatus = async (type) => {
    const { medical } = medicalDetail;
    const { medical_id } = medical;
    const result = await URMedicalApi.updateMedicalStatus({
      medical_status: type,
      medical_id,
    });
    if (result) {
      console.log(medicalDetail);
      setMedicalDetail({
        ...medicalDetail,
        medical: { ...medicalDetail.medical, medical_status: type },
      });
      MessageAlert.success('변경완료');
      await getMedicalStatus();
    } else {
      MessageAlert.error('변경 실패');
    }
  };
  /* Render */
  return (
    <div className="admin-company-list">
      <div
        style={{
          width: '100%',
          height: '88vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ width: '30%', height: '100%' }}>
          <Row gutter={[16, 16]}>{status}</Row>
        </div>
        <div style={{ width: '70%', height: '100%' }}>
          <Card title={`접수 현황(${filterStatus})`} style={{ height: '100%' }}>
            <div style={{ width: '100%', marginBottom: '1rem' }}>
              <Input
                placeholder="주민등록번호, 고객명, 전화번호를 입력해주세요."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Table
              columns={columns}
              dataSource={filterList}
              onRow={(item) => {
                return { onClick: () => handleOnClick(item) };
              }}
              style={{ width: '100%', height: '100%' }}
            />
          </Card>
        </div>
      </div>
      {/* <Row gutter={[10, 10]}>
        {status}
        <Col span={24}>
          <Card title={`접수 현황(${filterStatus})`}>
            <Table
              columns={columns}
              dataSource={filterList}
              onRow={(item) => {
                return { onClick: () => handleOnClick(item) };
              }}
              style={{ width: '100%', height: '100%' }}
            />
          </Card>
        </Col>
      </Row> */}
      {/* <Row gutter={[10, 10]}>
        {status}
        <Col span={24}>
          <Card title={`접수 현황(${filterStatus})`}>
            <Table
              columns={columns}
              dataSource={filterList}
              onRow={(item) => {
                return { onClick: () => handleOnClick(item) };
              }}
              style={{ width: '100%', height: '100%' }}
            />
          </Card>
        </Col>
      </Row> */}
      {/* <Modal
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
      </Modal> */}

      {medicalDetail && (
        <CustomerModal
          customer_id={medicalDetail.medical.customer_id}
          modal={modal}
          setModal={setModal}
          changeStatus={handleChangeStatus}
          medical_status={medicalDetail.medical.medical_status}
        />
      )}
    </div>
  );
};

export default DashboardStatus;
