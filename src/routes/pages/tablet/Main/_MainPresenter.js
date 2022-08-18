// import React, { createRef } from 'react';
import './_main.css';
import LOGO from 'assets/main-logo.png';
// import { Button, Space } from 'antd';
// import QRCode from 'react-qr-code';
// import { base_url } from 'utils';
// import { useHistory } from 'react-router-dom';
// import { ArrowRightOutlined } from '@ant-design/icons';
import { TelAuth } from './components';

const _MainPresenter = () => {
  /* Router */
  // const history = useHistory();
  /* State */
  // const { company_id } = company;
  /* Hooks */
  // const canvasRef = createRef();

  /* Functions */
  // const handleNewRegist = () => {
  //   history.push('/t/signup/old');
  // };

  // const handleOldRegist = () => {
  //   history.push('/t/signup/num');
  // };
  /* Render */
  return (
    <div className="main-wrapper">
      <div className="header">
        <div className="logo">
          <img src={LOGO} alt="logo" className="main-logo" />
        </div>
        <div className="header-text">
          <div>비대면 접수가 어려우신 분은 데스크에 문의해주세요.</div>
          <div>
            타인의 번호를 기입할 경우 발생되는 문제에 대해서 법적 책임은
            당사자에게 있습니다.
          </div>
        </div>
      </div>
      <div className="content">
        <div className="regist">
          <TelAuth />

          {/* <div className="btn-container">
            <div className="btn-text">
              <Space size="large">
                비대면 접수가 처음이신 분 <ArrowRightOutlined />
              </Space>
            </div>
            <Button className="btn new-btn" onClick={handleNewRegist}>
              치유 가입 및 접수
            </Button>
          </div>
          <div className="btn-container">
            <div className="btn-text">
              <Space size="large">
                비대면 접수를 해보신 분 <ArrowRightOutlined />
              </Space>
            </div>
            <Button className="btn old-btn" onClick={handleOldRegist}>
              비대면 접수
            </Button>
          </div> */}
        </div>
        {/* <div className="qr-code">
          <div className="image">
            <QRCode
              value={`${base_url}/${company_id}`}
              ref={canvasRef}
              id="created_qrcode"
              size={375}
            />
          </div>
          <div className="text">
            &#8251; 치유 어플을 통해 QR코드를 스캔하면, 보다 편하게 접수가
            가능합니다.
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default _MainPresenter;
