import React, { useEffect, useState } from 'react';
import { URCustomerApi } from 'api';
import AdminCustomerListPresenter from './AdminCustomerListPresenter';

const AdminCustomerListContainer = (props) => {
  const [customerList, setCustomerList] = useState([]);
  useEffect(() => {
    getCustomerList();
  }, []);

  const getCustomerList = async () => {
    const result = await URCustomerApi.getCustomerListAll();
    await setCustomerList(result);
  };

  return <AdminCustomerListPresenter customerList={customerList} />;
};

export default AdminCustomerListContainer;
