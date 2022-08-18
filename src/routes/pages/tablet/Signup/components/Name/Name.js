import { Button } from 'antd';
import React, { useState } from 'react';
import './name.css';
import NAME_ICON from 'assets/registerName.png';
import { URKeyboard } from 'components';

const Name = ({ prev, next, userName, setUserInfo, setLoading, setAudio }) => {
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const { customer_nm } = userName;

  const handleSetUserNm = (key) => {
    setUserInfo('customer_nm', key);
  };

  const handleNext = async () => {
    setAudio('registNum');
    await setLoading();
    await next();
  };

  return (
    <div className="name-container">
      <div className="left-side">
        <div className="icon">
          <img src={NAME_ICON} alt="name" />
        </div>
        <div className="title">
          접수하시는 분의
          <div className="strong">성함</div>을 입력해주세요.
        </div>
      </div>
      <div className="right-side">
        <div className="input-box">
          <input
            type="text"
            className="input-field-area input-name"
            name="customer_nm"
            placeholder="성 함"
            maxLength="6"
            value={customer_nm}
            // onChange={(e) => setUserInfo(e.target.name, e.target.value)}
            autoFocus
            readOnly
            autoComplete="off"
            onFocus={() => setKeyboardOpen(true)}
          />
        </div>
        <Button type="primary" className="name-btn" onClick={handleNext}>
          다음
        </Button>
        <div style={{ width: '100%' }}>
          <URKeyboard
            keyOpen={keyboardOpen}
            setKeyboard={setKeyboardOpen}
            setResult={handleSetUserNm}
            enterAction={handleNext}
          />
        </div>
      </div>
    </div>
  );
};

export default Name;
