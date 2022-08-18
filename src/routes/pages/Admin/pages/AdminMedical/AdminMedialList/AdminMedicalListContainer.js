import { URMedicalApi } from 'api';
import React, { useEffect, useState } from 'react';
import AdminMedicalListPresenter from './AdminMedicalListPresenter';

const AdminMedicalListContainer = (props) => {
  const [medicalList, setMedicalList] = useState([]);
  useEffect(() => {
    getMeidcalList();
  }, []);

  const getMeidcalList = async () => {
    const result = await URMedicalApi.getMedicalListAll();
    if (result) {
      await setMedicalList(result);
    }
  };

  return <AdminMedicalListPresenter medicalList={medicalList} />;
};

export default AdminMedicalListContainer;
