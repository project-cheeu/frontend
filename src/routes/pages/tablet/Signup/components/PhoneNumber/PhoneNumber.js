import { WhatsAppOutlined } from '@ant-design/icons';
import { Dial } from 'components';
import ModalLayout from 'components/layout/ModalLayout';
import React from 'react';
import { MessageAlert } from 'utils/';
import PhoneConfirm from './PhoneConfirm';
import './phonenumber.css';
const NUMBER_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, '✕', 0, '⬅'];

const PhoneNumber = ({
  tel,
  setTel,
  visible,
  setVisible,
  userInfo,
  submitAction,
  signupAction,
  signupOldAction,
  dump = false,
}) => {
  const handleSetTel = async (num) => {
    if (num === '✕') {
      setTel('010-');
      return;
    }
    if (tel !== '010' && num === '⬅') {
      setTel(tel.slice(0, -1));
      return;
    } else {
      await setTel(regexNum(tel + num));
    }
  };

  const handleCancel = () => {
    setVisible(false);
    setTel('010-');
    MessageAlert.warning('전화번호를 다시 입력해주세요.', 5);
  };

  const regexNum = (str) => {
    str = str.replace(/[^0-9]/g, '');
    var tmp = '';
    if (str.length < 4) {
      return str;
    } else if (str.length < 7) {
      tmp += str.substr(0, 3);
      tmp += '-';
      tmp += str.substr(3);
      return tmp;
    } else if (str.length < 11) {
      tmp += str.substr(0, 3);
      tmp += '-';
      tmp += str.substr(3, 3);
      tmp += '-';
      tmp += str.substr(6);
      return tmp;
    } else {
      tmp += str.substr(0, 3);
      tmp += '-';
      tmp += str.substr(3, 4);
      tmp += '-';
      tmp += str.substr(7);
      return tmp;
    }
  };

  return (
    <div className="phonenumber-container">
      <div className="left-side">
        <WhatsAppOutlined className="phone-icon" />
        <div className="phone-title">
          고객님의 소중한 <div className="strong">전화번호</div> 를 입력해주세요
        </div>
        <div className="phone-desc">
          고객님의 소중한 전화번호는 다른용도로 사용되지 않습니다.
        </div>
      </div>
      <div className="right-side">
        <h2>010 이후부터 입력해주세요</h2>
        <Dial
          numList={NUMBER_LIST}
          dialAction={handleSetTel}
          header={<div className="phone-input">{tel}</div>}
        />
        <div
          style={{
            width: '25vw',
            height: '6vh',
            lineHeight: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '6vw',
              fontSize: '1.2vw',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0 1vw',
            }}
          >
            모두 지우기
          </div>
          <div
            style={{
              width: '6vw',
              fontSize: '1.2vw',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0 1vw',
            }}
          ></div>
          <div
            style={{
              width: '6vw',
              fontSize: '1.2vw',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0 1vw',
            }}
          >
            하나 지우기
          </div>
        </div>
      </div>
      <ModalLayout
        title="고객 정보 확인"
        width=""
        modal={visible}
        setModal={setVisible}
      >
        <PhoneConfirm
          userInfo={userInfo}
          submitAction={submitAction}
          signupAction={signupAction}
          handleCancel={handleCancel}
          signupOldAction={signupOldAction}
          dump={dump}
        />
      </ModalLayout>
    </div>
  );
};

export default PhoneNumber;
