import React from 'react';
import { Descriptions, Input } from 'antd';
import CustomerAddress from './CustomerAddress';

const AdminCustomerInfo = ({ customerInfo, setCustomerInfo }) => {
  const handleAddress = (value) => {
    setCustomerInfo({ ...customerInfo, customer_addr: value });
  };

  const handleSetTel = (value) => {
    setCustomerInfo({ ...customerInfo, customer_tel: regexNum(value) });
  };

  const handleSetNum = (num) => {
    if (num.length > 14) {
      return;
    }
    setCustomerInfo({ ...customerInfo, customer_num: String(num) });
  };

  const handleNum = (num) => {
    if (num.length === 6) {
      const num2 = num + '-';
      handleSetNum(num2);
      return;
    }
    handleSetNum(num);
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
          <CustomerAddress setAddress={handleAddress} />
          {/* <Input
            name="customer_addr"
            value={customerInfo.customer_addr}
            onChange={(e) =>
              setCustomerInfo({
                ...customerInfo,
                [e.target.name]: e.target.value,
              })
            }
          /> */}
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

export default AdminCustomerInfo;
