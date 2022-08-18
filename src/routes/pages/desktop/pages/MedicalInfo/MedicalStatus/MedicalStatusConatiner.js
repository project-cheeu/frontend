import { URMedicalApi } from 'api';
import React, { useEffect, useState } from 'react';
import MedicalStatusPresenter from './MedicalStatusPresenter';

const MedicalStatusConatiner = () => {
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
    <MedicalStatusPresenter
      subjectList={subjectList}
      getMedicalSubject={getMedicalSubject}
    />
  );
};

export default MedicalStatusConatiner;
