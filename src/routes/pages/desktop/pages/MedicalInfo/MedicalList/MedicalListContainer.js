import { URMedicalApi } from 'api';
import { useAppState } from 'context/MainContext';
import React, { useEffect, useState } from 'react';
import MedicalListPresenter from './MedicalListPresenter';

const MedicalListContainer = (props) => {
  const { company } = useAppState();
  const { company_id } = company;
  const [medicalList, setMedicalList] = useState([]);
  const [medicalDetail, setMedicalDetail] = useState(undefined);

  useEffect(() => {
    getMeidcalList();
    // eslint-disable-next-line
  }, []);

  const getMeidcalList = async () => {
    const result = await URMedicalApi.getMedicalStatus(company_id);
    if (result) {
      await setMedicalList(result);
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
    <MedicalListPresenter
      medicalList={medicalList}
      medicalDetail={medicalDetail}
      setMedicalDetail={setMedicalDetail}
      getMedicalDetail={handleGetMedicalDetail}
      getMedicalStatus={getMeidcalList}
    />
  );
};

export default MedicalListContainer;
