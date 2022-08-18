import { URAuthApi } from 'api';
import { useAppDispatch } from 'context/MainContext';
import { ADMIN_SIGNIN } from 'context/MainReducer';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { MessageAlert } from 'utils';
import AdminSigninPresenter from './AdminSigninPresenter';

const AdminSigninContainer = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleSignin = async (loginInfo) => {
    const result = await URAuthApi.managerSignin(loginInfo);
    if (result) {
      await dispatch({ type: ADMIN_SIGNIN, payload: result });
      history.replace('/a');
      return;
    }

    MessageAlert.error('로그인에 실패했습니다. 다시 시도해주세요.');
  };

  return <AdminSigninPresenter signin={handleSignin} />;
};

export default AdminSigninContainer;
