import { Button } from 'antd';
import React from 'react';

const AddressModal = ({ customer_addr, cancelAction, submitAction }) => {
  return customer_addr ? (
    <div className="address-modal">
      <div className="address-result">
        <div className="title">{customer_addr}</div>
        <div className="desc">위의 주소가 맞습니까?</div>
      </div>

      <div className="address-modal-btn-group">
        <Button className="address-modal-btn" onClick={cancelAction}>
          아닙니다.
        </Button>
        <Button
          type="primary"
          className="address-modal-btn"
          onClick={submitAction}
        >
          네, 맞습니다.
        </Button>
      </div>
    </div>
  ) : (
    ''
  );
};

export default AddressModal;
