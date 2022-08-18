import { SET_PLATFORM } from 'context/MainReducer';
import React, { useEffect } from 'react';
import { isMobile, isMobileSafari } from 'react-device-detect';
import { Route, Switch, useHistory } from 'react-router-dom';
import { getCookie } from 'utils';
import { useAppDispatch, useAppState } from '../context/MainContext';
import { SignIn, Admin, Desktop, Tablet } from './pages';

/**
 * @title Routes
 * @description Main Router
 */
const Routes = () => {
  const history = useHistory();
  // eslint-disable-next-line
  const { member, admin, platform } = useAppState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    checkAdmin();
    // eslint-disable-next-line
  }, [admin]);

  const checkAdmin = async () => {
    const adminInfo = await getCookie('admin');
    if (adminInfo) {
      console.log('route', 1);
      history.replace('/a');
      return true;
    }
    return false;
  };

  useEffect(() => {
    checkPlatform();

    // eslint-disable-next-line
  }, []);

  const checkPlatform = async () => {
    const session = await JSON.parse(getCookie('member'));
    if (!session) {
      checkAdmin();
      return;
    }

    if (isMobile || isMobileSafari) {
      await dispatch({
        type: SET_PLATFORM,
        payload: 'mobile',
      });
      history.replace('/t');
    } else {
      await dispatch({
        type: SET_PLATFORM,
        payload: 'PC',
      });
      history.replace('/d');
    }
  };

  return (
    <Switch>
      <Route path="/d" component={Desktop} />
      <Route path="/a" component={Admin} />
      <Route path="/t" component={Tablet} />
      {/* {!member && <Route path="/" exact component={SignIn} />} */}
      <Route path="/" exact component={SignIn} />
    </Switch>
  );
};

export default Routes;
