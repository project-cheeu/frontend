import React, { useEffect } from 'react';
import { Descriptions, Input } from 'antd';

const CustomerForm = ({ customerInfo, setCustomerInfo }) => {
  /* Router */
  /* State */
  /* Hooks */

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.id = 'daum-post-code-api';
    document.body.appendChild(script);
    // eslint-disable-next-line
  }, []);

  /* Functions */
  /**
   * 카카오 주소 핸들러
   * --
   * @returns
   */
  const handleOpenAddr = () => {
    new window.daum.Postcode({
      onComplete: (data) => {
        const { address, buildingName, zonecode } = data;
        handleAddress(`${address} ${buildingName}(${zonecode})`);
      },
    }).open();
  };

  /**
   * 주서정보 상태 변경 핸들러
   * --
   * @param {*} value
   */
  const handleAddress = (value) => {
    setCustomerInfo({ ...customerInfo, customer_addr: value });
  };

  /**
   * 전화번호 상태 변경 핸들러
   * --
   * @param {*} value
   */
  const handleSetTel = (value) => {
    setCustomerInfo({ ...customerInfo, customer_tel: regexNum(value) });
  };

  /**
   * 주민번호 상태 변경 핸들러
   * --
   * @param {*} num
   * @returns
   */
  const handleSetNum = (num) => {
    if (num.length > 14) {
      return;
    }
    setCustomerInfo({ ...customerInfo, customer_num: String(num) });
  };

  /**
   * 주민번호 구분자 생성 핸들러
   * --
   * @param {*} num
   * @returns
   */
  const handleNum = (num) => {
    if (num.length === 6) {
      const num2 = num + '-';
      handleSetNum(num2);
      return;
    }
    handleSetNum(num);
  };

  /**
   * 주민번호 정규표현식
   * --
   * @param {*} str
   * @returns
   */
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

  /* Render */
  return (
    <div className="admin-company-submit">
      <Descriptions bordered>
        <Descriptions.Item label="고객명" span={4}>
          <Input
            name="customer_nm"
            value={customerInfo.customer_nm}
            onChange={(e) =>
              setCustomerInfo({
                ...customerInfo,
                [e.target.name]: e.target.value,
              })
            }
          />
        </Descriptions.Item>
        <Descriptions.Item label="고객 전화번호" span={4}>
          <Input
            name="customer_tel"
            value={customerInfo.customer_tel}
            onChange={(e) => handleSetTel(e.target.value)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="고객 주소" span={4}>
          <Input
            name="customer_addr"
            value={customerInfo.customer_addr}
            onClick={handleOpenAddr}
          />
        </Descriptions.Item>
        <Descriptions.Item label="주민등록번호" span={4}>
          <Input
            name="customer_num"
            value={customerInfo.customer_num}
            onChange={(e) => handleNum(e.target.value)}
          />
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default CustomerForm;
