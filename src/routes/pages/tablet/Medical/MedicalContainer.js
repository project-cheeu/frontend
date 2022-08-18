import React, { useEffect, useState } from 'react';
import { useAppState } from 'context//MainContext';
import MedicalPresenter from './MedicalPresenter';
import { useHistory } from 'react-router-dom';
import useSWR from 'swr';
import { ApiManager, base_url } from 'utils';
const $http = new ApiManager();

const MedicalContainer = (props) => {
  const history = useHistory();
  const { company } = useAppState();
  const { company_id } = company;

  const [medicalList, setMedicalList] = useState(false);

  const fetcher = async (...args) => await $http.get(...args);
  const { data, err } = useSWR(`${base_url}/medical/${company_id}/0`, fetcher, {
    refreshInterval: 3000,
  });

  useEffect(() => {
    getMedicalInfo();
    // eslint-disable-next-line
  }, [data]);

  const getMedicalInfo = async () => {
    if (err || !data) {
      return;
    }
    // const result = await URMedicalApi.getMedicalList(company_id);
    const { resultData } = data;

    setMedicalList(resultData);
  };

  return (
    <MedicalPresenter
      medicalList={medicalList}
      history={history}
      getMedicalInfo={getMedicalInfo}
    />
  );
};

export default MedicalContainer;
