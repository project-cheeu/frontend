import React, { useEffect, useState } from 'react';
import { MessageAlert } from 'utils';
import './pin_layout.css';

const NUMBER_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '←'];

const PIN_LIST = ['', '', '', ''];

const PinLayout = ({ user_pin, authAction }) => {
  const [pinNum, setPinNum] = useState('');
  const handleSetPinNum = (pin) => {
    if (pinNum === '' && pin === '') {
      return;
    }

    if (pin === '←') {
      setPinNum(pinNum.slice(0, -1));
      return;
    }
    setPinNum(pinNum + pin);
  };

  useEffect(() => {
    handleAuthPin();
    // eslint-disable-next-line
  }, [pinNum]);

  const handleAuthPin = () => {
    if (pinNum.length !== 4) {
      return;
    }
    if (pinNum === user_pin) {
      authAction(pinNum);
    } else {
      MessageAlert.error('핀이 틀렸습니다.');
    }
    setPinNum([]);
  };

  return (
    <div className="pin-layout">
      <div className="pin-number">
        {PIN_LIST.map((item, idx) => {
          const num = pinNum[idx];
          return (
            <div className={num ? 'num-placeholder active' : 'num-placeholder'}>
              *
            </div>
          );
        })}
      </div>
      <div className="dial-wrapper">
        {NUMBER_LIST.map((item) => {
          return (
            <div className="dial" onClick={() => handleSetPinNum(item)}>
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

PinLayout.defaultProps = {
  user_pin: '0000',
  authAction: (e) => {
    MessageAlert.success(e);
  },
};

export default PinLayout;
