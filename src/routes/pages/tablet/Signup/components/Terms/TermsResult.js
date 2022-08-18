import { Button, Descriptions } from 'antd';
import React from 'react';
import { rrn } from 'utils';
import './terms.css';

const TermsResult = ({
  userInfo,
  handleCancel,
  submitAction,
  insertLoading,
}) => {
  return (
    <div className="result-modal">
      <div className="result-name">
        {/* {userInfo.customer_nm} 환자분 진료 접수 도와드리겠습니다. */}
        {userInfo.customer_nm}님 접수정보입니다. 아래 내용이 맞으신가요?
      </div>
      <Descriptions bordered className="result-desc">
        <Descriptions.Item label="고객명" span={3} style={{ fontSize: '2vw' }}>
          {userInfo.customer_nm}
        </Descriptions.Item>
        <Descriptions.Item
          label="생년월일"
          span={3}
          className="result-desc-column"
        >
          {rrn(userInfo.customer_num)}
        </Descriptions.Item>
        <Descriptions.Item
          label="전화번호"
          span={3}
          className="result-desc-column"
        >
          {userInfo.customer_tel}
        </Descriptions.Item>
      </Descriptions>
      <div className="btn-group">
        <Button
          type="default"
          className="terms-result-btn"
          onClick={handleCancel}
        >
          아닙니다.
        </Button>
        <Button
          type="primary"
          className="terms-result-btn"
          loading={insertLoading}
          onClick={submitAction}
        >
          네, 맞습니다
        </Button>
      </div>
    </div>
  );
};

export default TermsResult;
