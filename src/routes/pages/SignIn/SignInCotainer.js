import React, { useState } from 'react';
import { ADMIN_SIGNIN, SET_PLATFORM, SIGNIN } from 'context/MainReducer';
import { useHistory } from 'react-router-dom';
import URAuthApi from '../../../api/URAuthApi';
import { useAppDispatch } from '../../../context/MainContext';
import { MessageAlert } from '../../../utils';
import SignInPresenter from './SignInPresenter';
import { isMobile } from 'react-device-detect';

const SignInCotainer = (props) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [admin, setAdmin] = useState(false);

  const handleSignIn = async (loginInfo) => {
    if (admin) {
      managerLogin(loginInfo);
    } else {
      memberLogin(loginInfo);
    }
  };

  const memberLogin = async (loginInfo) => {
    const result = await URAuthApi.signin(loginInfo);
    const platform = isMobile ? 'mobile' : 'PC';
    if (result) {
      await dispatch({ type: SIGNIN, payload: result });
      await dispatch({
        type: SET_PLATFORM,
        payload: platform,
      });
      if (platform === 'PC') {
        history.replace('/d');
      } else {
        history.replace('/t');
      }
    } else {
      MessageAlert.error('아이디나 비밀번호를 다시 확인하세요.');
    }
  };

  const managerLogin = async (loginInfo) => {
    const result = await URAuthApi.managerSignin(loginInfo);
    if (result) {
      await dispatch({ type: ADMIN_SIGNIN, payload: result });
      history.replace('/a');
      return;
    }

    MessageAlert.error('로그인에 실패했습니다. 다시 시도해주세요.');
  };

  return (
    <SignInPresenter
      admin={admin}
      setAdmin={setAdmin}
      handleSignIn={handleSignIn}
    />
  );
};

export default SignInCotainer;
