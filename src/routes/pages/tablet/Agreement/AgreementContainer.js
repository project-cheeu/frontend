import { URAgreementApi, URCustomerApi } from 'api';
import { useAppState } from 'context/MainContext';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { MessageAlert } from 'utils';
import AgreementPresenter from './AgreementPresenter';

const AgreementContainer = (props) => {
  /* Router */
  const { customer_id = undefined } = useParams();
  const history = useHistory();
  /* State */
  const { company } = useAppState();
  const { company_id } = company;
  const [agreementList, setAgreementList] = useState([]);
  const [customerInfo, setCustomerInfo] = useState(undefined);
  /* Hooks */
  useEffect(() => {
    if (customer_id) {
      getCustomerData();
    }
    // eslint-disable-next-line
  }, [customer_id]);

  useEffect(() => {
    getAgreementFormList();
    // eslint-disable-next-line
  }, []);
  /* Functions */

  const getAgreementFormList = async () => {
    const result = await URAgreementApi.getAgreementFormList(company_id);
    if (result) {
      setAgreementList(result);
    }
  };

  const getCustomerData = async () => {
    const result = await URCustomerApi.getCustomerDetail({
      company_id,
      customer_id,
    });
    if (result) {
      setCustomerInfo(result);
    }
  };

  const insertAgreement = async (postData) => {
    const result = await URAgreementApi.insertUserAgreement({
      ...postData,
      company_id,
      customer_id,
    });
    if (result) {
      MessageAlert.success('동의서 등록이 완료되었습니다.');
      history.push('/t');
      return;
    } else {
      MessageAlert.error('동의서 등록 실패');
      return;
    }
  };
  return (
    <AgreementPresenter
      customer_id={customer_id}
      agreementList={agreementList}
      setAgreementList={setAgreementList}
      customerInfo={customerInfo}
      company={company}
      insertAgreement={insertAgreement}
    />
  );
};

export default AgreementContainer;
