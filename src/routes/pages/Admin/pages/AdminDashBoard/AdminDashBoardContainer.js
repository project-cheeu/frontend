import { URDashboardApi, URMedicalApi } from 'api';
import React, { useEffect, useState } from 'react';
import { TypeManager } from 'utils';
import AdminDashBoardPresenter from './AdminDashBoardPresenter';

const AdminDashBoardContainer = (props) => {
  const [screen, setScreen] = useState(false);
  const [dashboard, setDashboard] = useState();
  const [medicalList, setMedicalList] = useState([]);
  const [medicalDetail, setMedicalDetail] = useState(undefined);

  useEffect(() => {
    getMedicalStatus();
    getDashboard();
  }, []);

  const getDashboard = async () => {
    const result = await URDashboardApi.getDashboard();
    if (result) {
      const { medical } = result;
      let total = 0;
      const list = TypeManager.list().map((types) => {
        const { type, value } = types;
        const [row] = medical.filter((item) => {
          const { medical_status } = item;
          return medical_status === type;
        });
        if (row) {
          const { status_count } = row;
          total += status_count;
          return { medical_status: value, status_count };
        }
        return { medical_status: value, status_count: 0 };
      });
      list.push({ medical_status: 'Total', status_count: total });
      setDashboard(list);
    }
  };

  const getMedicalStatus = async () => {
    const result = await URMedicalApi.getMedicalListAll();
    if (result) {
      setMedicalList(result);
    }
  };

  const handleGetMedicalDetail = async (medicalInfo) => {
    const { medical_id } = medicalInfo;
    const result = await URMedicalApi.getMedicalDetail(medical_id);
    if (result) {
      setMedicalDetail(result);
    }
  };

  return (
    <AdminDashBoardPresenter
      screen={screen}
      setScreen={setScreen}
      medicalList={medicalList}
      getMedicalList={getMedicalStatus}
      getMedicalDetail={handleGetMedicalDetail}
      medicalDetail={medicalDetail}
      dashboard={dashboard}
    />
  );
};

export default AdminDashBoardContainer;
