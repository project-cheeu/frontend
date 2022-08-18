import { URCustomerApi } from 'api';
import React, { useEffect, useState } from 'react';
import CustomerProfile from './components/CustomerProfile';
import ModalLayout from '../ModalLayout';
import { useAppState } from 'context/MainContext';

const CustomerModal = ({
  customer_id,
  modal,
  setModal,
  medical_id,
  medical_status,
  changeStatus,
  startPresurvey,
  startSurvey,
}) => {
  const { company } = useAppState();
  const [customer, setCustomer] = useState(undefined);
  useEffect(() => {
    getCustomerDetail();
    // eslint-disable-next-line
  }, [customer_id]);

  const getCustomerDetail = async () => {
    const { company_id } = company;

    const customer_detail = {
      company_id,
      customer_id,
    };
    const result = await URCustomerApi.getCustomerDetail(customer_detail);
    setCustomer(result);
  };

  return customer ? (
    <ModalLayout modal={modal} setModal={setModal} title="고객정보">
      <CustomerProfile
        key="1"
        customer={customer}
        medical_id={medical_id}
        medical_status={medical_status}
        medicalActions={changeStatus}
        startPresurvey={startPresurvey}
        startSurvey={startSurvey}
      />
    </ModalLayout>
  ) : (
    ''
  );
};

export default CustomerModal;
