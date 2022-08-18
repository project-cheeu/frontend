import { URCustomerApi } from 'api';
import { useAppState } from 'context/MainContext';
import React, { useEffect, useState } from 'react';
import CustomerListPresenter from './CustomerListPresenter';

const CustomerListContainer = (props) => {
  const [customerList, setCustomerList] = useState([]);
  const { company } = useAppState();
  const { company_id } = company;

  useEffect(() => {
    getCustomerList();
    // eslint-disable-next-line
  }, []);

  const getCustomerList = async () => {
    const result = await URCustomerApi.getCustomerListByCompanyId(company_id);
    if (result) {
      setCustomerList(result);
    }
  };
  return <CustomerListPresenter customerList={customerList} />;
};

export default CustomerListContainer;
