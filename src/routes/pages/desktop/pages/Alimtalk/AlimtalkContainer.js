import React, { useEffect, useState } from 'react';
import AlimtalkPresenter from './AlimtalkPresenter';
import { useAppState } from 'context/MainContext';
import { URAlimtalkApi } from 'api';

const AlimtalkContainer = () => {
  const { company } = useAppState();
  const { company_id } = company;
  const [alimtalkList, setAlimtalkList] = useState([]);

  useEffect(() => {
    getAlimtalk();
    // eslint-disable-next-line
  }, []);

  const getAlimtalk = async () => {
    const result = await URAlimtalkApi.getAlimtalk(company_id);
    setAlimtalkList(result);
  };
  return <AlimtalkPresenter alimtalk={alimtalkList} />;
};

export default AlimtalkContainer;
