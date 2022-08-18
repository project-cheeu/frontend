import React, { useEffect, useState } from 'react';
import SurveyUpdatePresenter from './SurveyUpdatePresenter';
import { URCompanyApi, URSurveyApi } from 'api/';
import { SurveyCompanyList } from './components';

const SurveyUpdateContainer = () => {
  const [companyList, setCompanyList] = useState([]);
  const [company, setCompany] = useState(false);
  const [surveyData, setSurveyData] = useState([]);

  const [scrollFn, setScrollFn] = useState(null);

  const refresh = (scrollToBottomCallback) => {
    setScrollFn(scrollToBottomCallback);
    getSurveyData();
  };

  useEffect(() => {
    getCompanyList();
    // eslint-disable-next-line
  }, []);

  const getCompanyList = async () => {
    const result = await URCompanyApi.getCompanyList();
    if (result) {
      setCompanyList(result);
      return;
    }
  };

  const handleSelectCompany = (company_id) => {
    setCompany(company_id);
    getSurveyData();
  };

  const getSurveyData = async (scrollToBottomCallback) => {
    const result = await URSurveyApi.getSurveyList(company);
    if (result) {
      setSurveyData(result);

      if (scrollToBottomCallback) {
      }
    }
  };

  useEffect(() => {
    if (scrollFn) {
      scrollFn();
    }

    return () => {
      setScrollFn(null);
    };
    // eslint-disable-next-line
  }, [surveyData]);

  useEffect(() => {
    getSurveyData();
    // eslint-disable-next-line
  }, [company]);

  return company ? (
    <SurveyUpdatePresenter surveyData={surveyData} refresh={refresh} />
  ) : (
    <SurveyCompanyList
      companyList={companyList}
      selectCompany={handleSelectCompany}
    />
  );
};

export default SurveyUpdateContainer;
