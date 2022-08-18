import { URCompanyApi } from 'api';
import React, { useEffect, useState } from 'react';
import AdminCompanyListPresenter from './AdminCompanyListPresenter';

const AdminCompanyListContainer = (props) => {
  const [companyList, setCompanyList] = useState();

  useEffect(() => {
    getCompanyList();
  }, []);

  const getCompanyList = async () => {
    const result = await URCompanyApi.getCompanyList();
    if (result) {
      await setCompanyList(result);
    }
  };
  return <AdminCompanyListPresenter companyList={companyList} />;
};

export default AdminCompanyListContainer;
