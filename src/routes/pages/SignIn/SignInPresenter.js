import React from 'react';
import { Form, Input, Button } from 'antd';
import LOGO from 'assets/logo2.png';
import './signin.css';

const SignInPresenter = ({
  admin,
  setAdmin,
  handleSignIn,
  platform,
  setPlatform,
}) => {
  const onFinish = async (values) => {
    await handleSignIn(values);
  };

  // const handleAnchor = (e, val) => {
  //   e.preventDefault();
  //   setPlatform(val);
  // };

  return (
    <div className="signin-container">
      <div className="login-wrapper">
        <div className="logo">
          <img src={LOGO} alt="logo" />
        </div>
        <h3 className="title">치유 (Chee U)</h3>
        <p className="desc">
          내원 환자, 문진 정보를 치유와 함께
          <br /> 손쉽게 관리해보세요.
        </p>
        {admin ? (
          <>
            <div className="type">
              <a
                href="/"
                onClick={(e) => e.preventDefault()}
                className="active"
              >
                관리자
              </a>
            </div>
            <Form onFinish={onFinish}>
              <Form.Item name={'manager_login_id'}>
                <Input
                  type="text"
                  placeholder="로그인 아이디"
                  autoComplete="off"
                />
              </Form.Item>
              <Form.Item name={'manager_login_pw'}>
                <Input
                  type="password"
                  placeholder="로그인 비밀번호"
                  autoComplete="off"
                />
              </Form.Item>
              <div className="buttons">
                <Button
                  type="default"
                  className="login-button"
                  shape="round"
                  size="large"
                  htmlType="submit"
                >
                  로그인
                </Button>
                <Button type="text" className="join-button" size="large">
                  가입문의
                </Button>
              </div>
            </Form>
          </>
        ) : (
          <>
            {/* <div className="type">
              <a
                href="/"
                className={platform === 'mobile' ? 'active' : ''}
                onClick={(e) => handleAnchor(e, 'mobile')}
              >
                태블릿용
              </a>
              <a
                href="/"
                className={platform === 'PC' ? 'active' : ''}
                onClick={(e) => handleAnchor(e, 'PC')}
              >
                PC용
              </a>
            </div> */}
            <Form onFinish={onFinish}>
              <Form.Item name={admin ? 'manager_login_id' : 'member_login_id'}>
                <Input
                  type="text"
                  placeholder="로그인 아이디"
                  autoComplete="off"
                />
              </Form.Item>
              <Form.Item name={admin ? 'manager_login_pw' : 'member_login_pw'}>
                <Input
                  type="password"
                  placeholder="로그인 비밀번호"
                  autoComplete="off"
                />
              </Form.Item>
              <div className="buttons">
                <Button
                  type="default"
                  className="login-button"
                  shape="round"
                  size="large"
                  htmlType="submit"
                >
                  로그인
                </Button>
                <Button type="text" className="join-button" size="large">
                  가입문의
                </Button>
              </div>
            </Form>
          </>
        )}

        <div className="footer">
          <a href="https://terms.cheeu.tk"> 이용약관 및 정책</a>
        </div>
      </div>
      {admin ? (
        <Button className="signin-admin-btn" onClick={() => setAdmin(false)}>
          병원용
        </Button>
      ) : (
        <Button className="signin-admin-btn" onClick={() => setAdmin(true)}>
          관리자용
        </Button>
      )}
    </div>
  );
};

export default SignInPresenter;
