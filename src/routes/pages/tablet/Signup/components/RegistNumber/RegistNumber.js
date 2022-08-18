import { ArrowRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useEffect } from 'react';
import { MessageAlert } from 'utils';
import './regist-number.css';
import REGIST_NUMBER_ICON from 'assets/registerName.png';
const NUMBER_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, '✕', 0, '⬅'];

const checkNull = (str) => {
  if (typeof str === 'undefined' || str === null || str === '') {
    return true;
  } else {
    return false;
  }
};

const rrnDirectHide = (str) => {
  let hideString = '';

  if (checkNull(str) === true) {
    return '';
  }

  if (str.length <= 14) {
    if (str.length >= 6) {
      hideString =
        str.substr(0, 6) +
        '-' +
        str.substr(7, 1) +
        String(str.substr(8, str.length - 9).replace(/./g, '*'));
      hideString +=
        str.length > 8
          ? str.length >= 14
            ? '*'
            : str.substr(str.length - 1, 1)
          : '';
    } else {
      hideString = str;
    }
  } else {
  }

  // console.log('hideString: ', hideString);
  return hideString;
};

const RegistNumber = ({
  prev,
  next,
  userInfo,
  setUserInfo,
  setLoading,
  setAudio,
}) => {
  const [toggle, setToggle] = React.useState(false);
  const { customer_num } = userInfo;
  const handleCustomerNum = (value) => {
    setUserInfo('customer_num', value);
  };

  useEffect(() => {
    handleVerify();
    // eslint-disable-next-line
  }, [userInfo]);

  const handleSetNum = (num) => {
    if (!customer_num && num !== '⬅') {
      handleCustomerNum(String(num));
      return;
    }
    if (num === '⬅') {
      handleCustomerNum(customer_num.slice(0, -1));
      return;
    }
    if (num === '✕') {
      handleCustomerNum('');
      return;
    }
    if (customer_num.length >= 14) {
      return;
    }

    if (customer_num.length === 6) {
      handleCustomerNum(customer_num + '-' + num);
      return;
    }
    handleCustomerNum(customer_num + num);
  };

  const handleVerify = async () => {
    if (!customer_num || customer_num.length !== 14) {
      setToggle(false);
      return;
    }

    const [num1, num2] = customer_num.split('-');
    const result = ssnCheck(num1, num2);
    if (!result) {
      MessageAlert.error('올바른 주민등록 번호를 입력하여 주세요');
      setToggle(false);
      return;
    }
    setToggle(true);
  };

  const ssnCheck = (_ssn1, _ssn2) => {
    var ssn1 = _ssn1,
      ssn2 = _ssn2,
      ssn = ssn1 + '' + ssn2,
      arr_ssn = [],
      compare = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5],
      sum = 0; // 입력여부 체크

    for (var i = 0; i < 13; i++) {
      arr_ssn[i] = ssn.substring(i, i + 1);
    }

    for (var j = 0; j < 12; j++) {
      sum = sum + arr_ssn[j] * compare[j];
    }

    if (_ssn2[0] >= 5) {
      sum = (13 - (sum % 11)) % 10;
    } else {
      sum = (11 - (sum % 11)) % 10;
    }

    if (sum !== parseInt(arr_ssn[12])) {
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (customer_num && customer_num.length >= 14) {
      setLoading();
      next();
      // setAudio('address');
      return;
    }
  };

  return (
    <div className="register-number-container">
      <div className="left-side">
        <div className="icon">
          <img src={REGIST_NUMBER_ICON} alt="REGIST_NUMBER_ICON" />
        </div>
        <div className="title">
          접수하시는 분의 소중한
          <div className="strong">주민등록번호</div>를 입력해주세요.
        </div>
        <div className="desc">
          병원에서 주민등록번호 수집은 건강보험가입여부를 확인하기 위한
          수단으로서 꼭 기입해주셔야 합니다. 기입하지 않으실 경우 접수가
          불가능할 수 있습니다. 이외 다른 용도로는 사용되지 않습니다.
        </div>
        <br />
        <div className="desc">
          타인의 주민등록번호 도용시 3년 이하의 징역 또는 1천만원 이하의 벌금에
          처하도록 규정하고 있습니다.
        </div>
      </div>
      <div className="right-side">
        <div className="input-box">
          <input
            type="text"
            className="input-field-area input-num"
            name="customer_num"
            placeholder="주민등록번호"
            maxLength="14"
            disabled
            value={rrnDirectHide(customer_num)}
          />
          <Button
            type="primary"
            disabled={!toggle}
            className="num-next-btn"
            onClick={handleNext}
          >
            다음
            <ArrowRightOutlined />
          </Button>
        </div>
        <div className="num-pad">
          {NUMBER_LIST.map((item) => {
            return (
              <div
                className={item === '' ? 'blank' : 'dial'}
                onClick={() => handleSetNum(item)}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RegistNumber;
