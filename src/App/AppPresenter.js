import React, { useEffect } from 'react';
import { useAppDispatch, useAppState } from '../context/MainContext';
import { SET_LOADING } from '../context/MainReducer';
import Routes from '../routes';
import { getCookie } from '../utils';

/**
 * @title AppPresenter
 * @description Render Router
 */
const AppPresenter = (props) => {
  const { member } = useAppState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getSessison();

    // eslint-disable-next-line
  }, [member]);

  const getSessison = async () => {
    dispatch({ type: SET_LOADING, payload: true });
    if (!member) {
      const cookie_member = JSON.parse(getCookie('member'));
      const cookie_company = JSON.parse(getCookie('company'));
      const cookie_assets = JSON.parse(getCookie('assets'));
      const token = getCookie('token');
      if (!token) {
        await dispatch({ type: SET_LOADING, payload: false });

        return false;
      }
      await dispatch({
        type: 'SESSION',
        payload: {
          member: cookie_member,
          company: cookie_company,
          assets: cookie_assets,
        },
      });
    }
    await dispatch({ type: SET_LOADING, payload: false });
  };

  return <Routes />;
};

export default AppPresenter;
