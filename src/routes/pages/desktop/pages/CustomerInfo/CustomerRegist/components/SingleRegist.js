import React, { useState } from 'react';
import { Alert, Button } from 'antd';
import { URCustomerApi } from 'api';
import { MessageAlert } from 'utils';
import { useHistory } from 'react-router-dom';
import CustomerForm from './CustomerForm';
import { InfoCircleOutlined } from '@ant-design/icons';

const SingleRegist = () => {
  /* Router */
  const history = useHistory();

  /* State */
  const [customerInfo, setCustomerInfo] = useState({
    access_platform: 'DEFAULT',
  });

  /* Hooks */
  /* Functions */
  /**
   * 고객 등록
   * --
   * @returns
   */
  const handleSubmit = async () => {
    const result = await URCustomerApi.insertSingleCustomer(customerInfo);
    if (result) {
      MessageAlert.success('고객 등록에 성공했습니다.');
      history.push('/d/customer/list');
      return true;
    }
    MessageAlert.error('고객 등록에 실패했습니다. 다시 확인해주세요.');
    return false;
  };

  /* Render */
  return (
    <>
      <div style={{ width: '100%', padding: '0 0 1vh 0' }}>
        <Alert
          message={
            <>
              <InfoCircleOutlined /> 한번에 많은 고객을 등록하시려면 다수 등록을
              선택해주세요.
            </>
          }
          type="success"
        />
      </div>
      <CustomerForm
        customerInfo={customerInfo}
        setCustomerInfo={setCustomerInfo}
      />
      <div style={{ width: '100%', padding: '1vw', textAlign: 'center' }}>
        <Button type="primary" size="large" onClick={handleSubmit}>
          등록
        </Button>
      </div>
    </>
  );
};

export default SingleRegist;
