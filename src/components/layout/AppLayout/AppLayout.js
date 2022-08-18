import React, { useState } from 'react';
import { ArrowLeftOutlined, SettingOutlined } from '@ant-design/icons';
import './layout.css';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppState } from 'context/MainContext';
import { LOGOUT, SET_LOADING } from 'context/MainReducer';
import { Loading } from 'components/lib';
import { ManagerModal, ModalLayout, PinLayout } from '../';

const AppLayout = ({ children }) => {
  const { member, loading } = useAppState();
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState(false);
  const [managerModal, setManagerModal] = useState(false);
  const history = useHistory();

  // useEffect(() => {
  //   if (!member) {
  //     // dispatch({ type: LOGOUT });
  //     history.replace('/');
  //   }
  //   // eslint-disable-next-line
  // }, []);

  /**
   * @title handleLogout
   * @description 태블릿 상요자 로그아웃
   * @param {}
   */
  const handleLogout = async () => {
    await dispatch({ type: SET_LOADING, payload: true });
    await dispatch({ type: LOGOUT });
    await setModal(false);
    await setManagerModal(false);
    await dispatch({ type: SET_LOADING, payload: false });
    await history.go(0);
  };

  /**
   * @title handleCloseAction
   * @description 태블릿 매니저 핀 레이아웃 이후 모든 모달 제거
   * @param {}
   */
  const handleCloseAction = () => {
    setModal(false);
    setManagerModal(false);
  };

  return (
    <div className="app-layout">
      {loading && <Loading />}

      {history.location.pathname === '/t' ? (
        ''
      ) : (
        <div className="main-home-container">
          <ArrowLeftOutlined
            className="home-btn"
            onClick={() => history.goBack()}
          />
        </div>
      )}

      {children}

      {history.location.pathname === '/t' ? (
        <div className="main-below-box" onClick={setModal}>
          <div className="navigate-admin-button-area">
            <div className="navigate-admin-button-icon">
              <SettingOutlined />
            </div>
          </div>
        </div>
      ) : (
        ''
      )}

      <ModalLayout
        width=""
        title="매니저 인증"
        modal={modal}
        setModal={setModal}
        closeAction={() => setManagerModal(false)}
      >
        {managerModal ? (
          <ManagerModal
            closeAction={handleCloseAction}
            logoutAction={handleLogout}
          />
        ) : (
          <PinLayout
            user_pin={member.member_pin}
            authAction={() => setManagerModal(true)}
          />
        )}
      </ModalLayout>
    </div>
  );
};

export default AppLayout;
