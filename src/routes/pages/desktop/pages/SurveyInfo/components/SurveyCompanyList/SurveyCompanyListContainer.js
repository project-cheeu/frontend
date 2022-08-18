import AdminGrid from 'components/layout/AdminGrid';
import React from 'react';
import SurveyCompanyListPresenter from './SurveyCompanyListPresenter';

const SurveyCompanyListContainer = ({ companyList, selectCompany }) => {
  return (
    <AdminGrid>
      <SurveyCompanyListPresenter
        companyList={companyList}
        selectCompany={selectCompany}
      />
    </AdminGrid>
  );
};

export default SurveyCompanyListContainer;
