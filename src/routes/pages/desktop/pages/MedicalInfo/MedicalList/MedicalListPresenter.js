import React, { useState } from 'react';
import moment from 'moment';
import { AdminGrid } from 'components';
import { MessageAlert, timeConversion, TypeManager } from 'utils';
import { v4 } from 'uuid';
import { Table } from 'antd';
import { CustomerModal } from 'components/layout';
import { URMedicalApi } from 'api';
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
      return timeConversion(value * 1000, 'hh:mm');
    },
  },
  {
    title: '대기시간',
    dataIndex: 'completed_at',
    render: (completed_at, obj, idx) => {
      const { created_at } = obj;
      if (completed_at) {
        // return moment(val * 1000 - created_at * 1000);
        return parseInt((completed_at - created_at) / 60) + '분';
      }
      return parseInt(moment(moment() / 1000 - created_at) / 60) + '분';
    },
  },
  {
    title: '진료 상태',
    dataIndex: 'medical_status',
    render: (medical_status, row, idx) => {
      const { color, value } = TypeManager.getStatusType(medical_status);
      return <span style={{ color }}>{value}</span>;
    },
  },
];
const MedicalListPresenter = ({
  medicalList,
  medicalDetail,
  setMedicalDetail,
  getMedicalDetail,
  getMedicalStatus,
}) => {
  const [modal, setModal] = useState(false);

  const handleOnClick = async (item) => {
    await getMedicalDetail(item);
    await setModal(true);
  };

  const handleChangeStatus = async (type) => {
    const { medical } = medicalDetail;
    const { medical_id } = medical;
    const result = await URMedicalApi.updateMedicalStatus({
      medical_status: type,
      medical_id,
    });
    if (result) {
      setMedicalDetail({
        ...medicalDetail,
        medical: { ...medical, medical_status: type },
      });
      MessageAlert.success('변경완료');
      await getMedicalStatus();
    } else {
      MessageAlert.error('변경 실패');
    }
  };

  return (
    <AdminGrid>
      <div className="admin-company-list">
        <Table
          columns={columns}
          dataSource={medicalList}
          rowKey={() => v4()}
          onRow={(item) => {
            return { onClick: () => handleOnClick(item) };
          }}
        />
      </div>

      {medicalDetail && (
        <CustomerModal
          customer_id={medicalDetail.medical.customer_id}
          modal={modal}
          setModal={setModal}
          changeStatus={handleChangeStatus}
          medical_status={medicalDetail.medical.medical_status}
        />
      )}
    </AdminGrid>
  );
};

export default MedicalListPresenter;
