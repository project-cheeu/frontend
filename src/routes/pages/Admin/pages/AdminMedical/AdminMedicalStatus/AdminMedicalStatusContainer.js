import { URMedicalApi } from 'api';
import React, { useEffect, useState } from 'react';
import AdminMedicalStatusPresenter from './AdminMedicalStatusPresenter';

const AdminMedicalStatusContainer = (props) => {
  const [subjectList, setSubjectList] = useState([]);

  useEffect(() => {
    getMedicalSubject();
  }, []);

  const getMedicalSubject = async () => {
    const result = await URMedicalApi.getMedicalSubjectList();
    if (result) {
      setSubjectList(result);
    }
  };
  return (
    <AdminMedicalStatusPresenter
      subjectList={subjectList}
      getMedicalSubject={getMedicalSubject}
    />
  );
};

export default AdminMedicalStatusContainer;
