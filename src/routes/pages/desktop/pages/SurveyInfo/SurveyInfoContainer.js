import React, { useEffect, useState } from 'react';
import { URSurveyApi } from 'api/';
import { useAppState } from 'context/MainContext';
import SurveyInfoPresenter from './SurveyInfoPresenter';

const SurveyInfoContainer = (props) => {
  const { company } = useAppState();

  const { company_id } = company;
  const [surveyData, setSurveyData] = useState([]);

  const [scrollFn, setScrollFn] = useState(null);

  useEffect(() => {
    refresh();
    // eslint-disable-next-line
  }, []);

  const refresh = (scrollToBottomCallback) => {
    setScrollFn(scrollToBottomCallback);
    getSurveyData();
  };

  const getSurveyData = async (scrollToBottomCallback) => {
    const result = await URSurveyApi.getSurveyList(company_id);
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

  return <SurveyInfoPresenter surveyData={surveyData} refresh={refresh} />;
};

export default SurveyInfoContainer;
