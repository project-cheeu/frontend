import React, { useState } from 'react';
import { Button, Input, Descriptions } from 'antd';
import LANDMARK from 'assets/main-logo.png';
import { MessageAlert } from 'utils';
import './initalpage.css';
import { ModalLayout } from 'components/layout';

const InitalPage = ({ insertManager }) => {
  const [modal, setModal] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [adminInfo, setAdminInfo] = useState({});
  const handleCancel = () => {
    setModal(false);
    setAdmin(false);
    setAdminInfo({});
  };

  const checkManager = async (val) => {
    if (val === '20201216') {
      setAdmin(true);
    }
  };

  const handleInsertManager = async () => {
    const {
      manager_login_id,
      manager_login_pw,
      manager_nm,
      pw_check,
    } = adminInfo;
    if (pw_check !== manager_login_pw) {
      MessageAlert.warning('비밀번호가 틀렸습니다.');
      return;
    }
    if (
      manager_login_id.length < 5 ||
      manager_login_pw.length < 4 ||
      manager_nm.length < 3
    ) {
      MessageAlert.warning('입력정보를 다시 확인해주세요.');
      return;
    }
    const result = await insertManager(adminInfo);
    if (result) {
      setModal(false);
      setAdmin(false);
      setAdminInfo({});
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        flexDirection: 'column',
        backgroundColor: '#1890ff',
      }}
    >
      <div style={{ width: '20%' }}>
        <img src={LANDMARK} alt="logo" style={{ width: '100%' }} />
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0 }}>
        <Button
          type="primary"
          style={{ border: 'none', color: 'white' }}
          onClick={() => setModal(true)}
        >
          관리자 세팅
        </Button>
      </div>
      <ModalLayout
        title={admin ? '매니저 정보' : '관리자 인증하기'}
        modal={modal}
        setModal={setModal}
        closeAction={handleCancel}
        width="60%"
      >
        {admin ? (
          <div style={{ padding: '2%' }}>
            <Descriptions className="manager-setup" layout="vertical">
              <Descriptions.Item span={4} label="아이디">
                <Input
                  name="manager_login_id"
                  placeholder="로그인 아이디"
                  value={adminInfo.manager_login_id}
                  onChange={(e) =>
                    setAdminInfo({
                      ...adminInfo,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Descriptions.Item>
              <Descriptions.Item span={4} label="비밀번호">
                <Input
                  name="manager_login_pw"
                  placeholder="비밀번호"
                  type="password"
                  value={adminInfo.manager_login_pw}
                  onChange={(e) =>
                    setAdminInfo({
                      ...adminInfo,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Descriptions.Item>
              <Descriptions.Item span={4} label="비밀번호 확인">
                <Input
                  name="pw_check"
                  placeholder="비밀번호 확인"
                  type="password"
                  value={adminInfo.pw_check}
                  onChange={(e) =>
                    setAdminInfo({
                      ...adminInfo,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Descriptions.Item>
              <Descriptions.Item span={4} label="관리자 핀">
                <Input
                  name="manager_pin"
                  type="number"
                  placeholder="핀 비밀번호 4자리"
                  value={adminInfo.manager_pin}
                  onChange={(e) =>
                    setAdminInfo({
                      ...adminInfo,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Descriptions.Item>
              <Descriptions.Item span={4} label="매니저명">
                <Input
                  name="manager_nm"
                  placeholder="관리자 이름"
                  value={adminInfo.manager_nm}
                  onChange={(e) =>
                    setAdminInfo({
                      ...adminInfo,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Descriptions.Item>
            </Descriptions>
            <Button
              block
              type="primary"
              size="large"
              onClick={handleInsertManager}
            >
              등록
            </Button>
          </div>
        ) : (
          <div style={{ padding: '2%', width: '100%' }}>
            <Input
              style={{ width: '100%' }}
              size="large"
              placeholder="관리자 승인번호 입력"
              onChange={(e) => checkManager(e.target.value)}
            />
          </div>
        )}
      </ModalLayout>
    </div>
  );
};

export default InitalPage;
