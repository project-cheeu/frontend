import React from 'react';
// import QRCODE from 'assets/qr.svg';
import LOGO from 'assets/main-logo.png';
import './main2.css';

import { TelAuth } from './components';

const MainPresenter = () => {
  return (
    <div className="main-container">
      <div className="left-side">
        <div className="regist-wrapper">
          <div className="regist">
            <div className="title-wrapper">
              <div className="title">비대면으로 빠른 접수가 가능합니다.</div>
              <div className="title">고객님의 휴대폰 번호를 눌러주세요.</div>
            </div>
            <div className="desc-wrapper">
              <div className="strong">
                ※ 비대면 접수가 어려우신 분은 데스크에 문의해주세요
                <div>
                  ※ 타인의 번호를 기입할 경우 생기는 법적 책임은 본인에게
                  있습니다.
                </div>
              </div>
            </div>
            <div className="logo-wrapper">
              <img src={LOGO} alt="logo" className="main-logo" />
            </div>
            {/* <TelAuth /> */}
          </div>
        </div>
      </div>
      <div className="right-side">
        <TelAuth />
        {/* <div className="qr-wrapper">
          <img src={QRCODE} alt="qrcode" className="qr-img" />
          <div className="title">스마트폰으로 접수하세요!</div>
          <div className="desc">
            스마트폰의 QR코드 혹은 원업앱을 통해 <br />
            내손안에서 진료 접수하세요
          </div>
        </div> */}
      </div>
    </div>
  );
};
MainPresenter.defaultProps = {
  assets: {
    logo: 'http://oneupcreative.kr/wp-content/uploads/2020/11/logo_w_100px.png',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet accusantium cupiditate reiciendis necessitatibus vel, suscipit unde recusandae quo accusamus iste quasi numquam, nihil rerum laboriosam          officia ipsam! Quisquam, aliquam nobis!',
  },
};

export default MainPresenter;
