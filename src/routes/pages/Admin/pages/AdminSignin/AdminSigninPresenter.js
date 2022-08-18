import React from 'react';
import { Button, Input, Form } from 'antd';
import { Link } from 'react-router-dom';

const AdminSigninPresenter = ({ admin, signin }) => {
  const onFinish = async (loginInfo) => {
    await signin(loginInfo);
  };

  return (
    <div className="signin-container">
      <div className="login-wrapper">
        <div className="logo">Logo</div>
        <h3 className="title">원업 크레이티브</h3>
        <p className="desc">
          내원 환자들을 원업크레이티브와 함께 손쉽게 관리해보세요.
        </p>
        <div className="type">
          <Link to="/">태블릿용</Link>
          <Link to="/admin" className="active">
            PC용
          </Link>
        </div>
        <Form onFinish={onFinish}>
          <Form.Item name="manager_login_id">
            <Input type="text" placeholder="로그인 아이디" />
          </Form.Item>
          <Form.Item name="manager_login_pw">
            <Input type="password" placeholder="로그인 비밀번호" />
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
              회원가입
            </Button>
          </div>
        </Form>
      </div>
    </div>
    //  <div
    //   style={{
    //     width: '100%',
    //     height: '100%',
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     flexDirection: 'column',
    //   }}
    // >
    //   <h1 style={{ width: '50%', fontSize: '3vw', lineHeight: '2' }}>
    //     Untact Register 관리자용
    //   </h1>
    //   <Form
    //     id="components-form-demo-normal-login"
    //     name="normal_login"
    //     className="login-form"
    //     onFinish={onFinish}
    //     style={{ width: '50%' }}
    //   >
    //     <Form.Item
    //       name="manager_login_id"
    //       rules={[{ required: true, message: '아이디를 입력하세요!' }]}
    //     >
    //       <Input
    //         prefix={<UserOutlined className="site-form-item-icon" />}
    //         placeholder="로그인 아이디"
    //         style={{ padding: '2.5%', fontSize: '1.5rem' }}
    //       />
    //     </Form.Item>
    //     <Form.Item
    //       name="manager_login_pw"
    //       rules={[{ required: true, message: '비밀번호를 입력하세요!' }]}
    //     >
    //       <Input
    //         prefix={<LockOutlined className="site-form-item-icon" />}
    //         type="password"
    //         placeholder="로그인 비밀번호"
    //         style={{ padding: '2.5%', fontSize: '1.5rem' }}
    //       />
    //     </Form.Item>

    //     <Form.Item>
    //       <Button
    //         type="primary"
    //         htmlType="submit"
    //         className="login-form-button"
    //         block
    //         size="large"
    //       >
    //         로그인
    //       </Button>
    //     </Form.Item>
    //   </Form>
    //   <Link to="/">사용자 페이지로</Link>
    // </div>
  );
};

export default AdminSigninPresenter;
