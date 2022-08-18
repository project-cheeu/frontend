import React from 'react';
import { AssetsDisplay, CompanyDisplay } from './components';

const CompanyInfoPresenter = ({
  companyInfo,
  assetsInfo,
  setAssetsInfo,
  setCompanyInfo,
  updateCompanyInfo,
  handleAssetsSubmit,
}) => {
  /* Router */
  /* State */
  /* Hooks */
  /* Functions */
  /* Render */
  return companyInfo ? (
    <>
      <CompanyDisplay
        company={companyInfo}
        setCompanyInfo={setCompanyInfo}
        updateCompanyInfo={updateCompanyInfo}
      />
      <AssetsDisplay
        company={companyInfo}
        setCompanyInfo={setCompanyInfo}
        assetsInfo={assetsInfo}
        setAssetsInfo={setAssetsInfo}
        updateCompanyInfo={updateCompanyInfo}
        submitAction={handleAssetsSubmit}
      />
    </>
  ) : (
    ''
  );
};

export default CompanyInfoPresenter;
