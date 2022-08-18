import React, { useState } from 'react';
import { Button, Steps } from 'antd';
import AdminGrid from 'components/layout/AdminGrid';
import { AdminCustomerInfo } from './components';
import { URCustomerApi } from 'api';
import { MessageAlert } from 'utils';
import { useHistory } from 'react-router-dom';
const { Step } = Steps;
const AdminCustomerRegisterPresenter = (props) => {
  const history = useHistory();
  const [current, setCurrent] = useState(0);
  const [customerInfo, setCustomerInfo] = useState({
    access_platform: 'DEFAULT',
  });

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleSubmit = async () => {
    const result = await URCustomerApi.insertCustomer(customerInfo);
    if (result) {
      MessageAlert.success('고객 등록에 성공했습니다.');
      history.push('/a/customer/list');
      return true;
    }
    MessageAlert.error('고객 등록에 실패했습니다. 다시 확인해주세요.');
    return false;
  };

  const steps = [
    {
      title: '고객',
      content: (
        <AdminCustomerInfo
          customerInfo={customerInfo}
          setCustomerInfo={setCustomerInfo}
        />
      ),
      desc: (
        <div>
          <div>고객정보를 입력합니다.</div>
          <div>전화번호는 고유한 값이어야합니다.</div>
        </div>
      ),
    },
    {
      title: '병원',
      content: <div>다음을 눌러 넘어가 주세요.</div>,
      desc: (
        <div>
          <div>등록할 병원명을 입력합니다.</div>
          <div>현재는 제공되지 않는 기능입니다.</div>
        </div>
      ),
    },
    {
      title: '등록',
      content: '등록 버튼을 눌러 등록합니다.',
    },
  ];
  return (
    <AdminGrid>
      <Steps current={current} style={{ padding: '1%' }}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content" style={{ padding: '1%' }}>
        {steps[current].desc}
      </div>
      <div className="steps-content">{steps[current].content}</div>

      <div style={{ marginTop: '1%', textAlign: 'center' }}>
        {current > 0 && (
          <Button style={{ marginRight: '10px' }} size="large" onClick={prev}>
            이전
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" size="large" onClick={handleSubmit}>
            완료
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" size="large" onClick={next}>
            다음
          </Button>
        )}
      </div>
    </AdminGrid>
  );
};

export default AdminCustomerRegisterPresenter;
