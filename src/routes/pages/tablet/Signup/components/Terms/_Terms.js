import { FormOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ModalLayout } from 'components';
import { useAppState } from 'context/MainContext';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './terms.css';
import TermsResult from './TermsResult';

const _Terms = ({ handleSubmit }) => {
  /* Router */
  const history = useHistory();
  /* State */
  const [visible, setVisible] = useState(false);
  const { customer } = useAppState();
  console.log(customer);
  /* Functions */
  const submitAction = async () => {
    await handleSubmit(customer);
  };

  const handleCancel = () => {
    setVisible(false);
    history.push('/');
  };
  /* Hooks */
  /* Render */
  return (
    <div className="terms-container">
      <div className="left-side">
        <FormOutlined className="icon" />
        <div className="title">
          환자분의 소중한
          <div className="strong">서명</div>을 부탁드립니다.
        </div>
        <div className="desc">본 이용약관에 동의하신다면 서명해주세요.</div>
      </div>
      <div className="right-side">
        <div className="scripts">
          <iframe
            title="개인정보 수집 및 이용약관"
            aria-disabled
            src="https://terms.cheeu.kr/"
            frameBorder="0"
          />
        </div>
        <div className="terms-btn-group">
          <Button className="terms-btn" onClick={setVisible}>
            위 내용을 모두 읽었으며 동의합니다.
          </Button>
        </div>
      </div>
      <ModalLayout
        width="1000"
        modal={visible}
        setModal={setVisible}
        title="회원정보 확인"
      >
        <TermsResult
          handleCancel={handleCancel}
          submitAction={submitAction}
          userInfo={customer}
        />
      </ModalLayout>
    </div>
  );
};

export default _Terms;
