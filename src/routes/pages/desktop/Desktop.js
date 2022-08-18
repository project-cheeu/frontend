import { URAuthApi } from 'api';
import { DesktopLayout } from 'components/layout';
import { useAppDispatch, useAppState } from 'context/MainContext';
import { ADMIN_SESSION, SET_LOADING } from 'context/MainReducer';
import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { getCookie, setCookie } from 'utils';
import {
  CompanyInfo,
  CompanyMemberInfo,
  Dashboard,
  MedicalList,
  MedicalStatus,
  SurveyInfo,
  CompanyDeptInfo,
  CustomerStatistics,
  Alimtalk,
  CustomerList,
  CustomerRegist,
  MedicalAgreement,
  Reservation,
  Wating,
} from './pages';
import { SurveyStatistics } from './pages/Statistics';

const Desktop = (props) => {
  const history = useHistory();

  const { member } = useAppState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    checkSession();
    // eslint-disable-next-line
  }, [member]);

  const checkSession = async () => {
    const token = await getCookie('token');

    const verify = await URAuthApi.verifyToken(token);
    if (!verify) {
      console.log('Desktop', 1);
      handleLogout();
      return;
    }
  };

  const handleLogout = () => {
    logout(() => {
      history.replace('/');
    });
  };

  const logout = async (callback) => {
    await dispatch({ type: SET_LOADING, payload: true });
    await setCookie('token', false);
    await setCookie('member', false);
    await setCookie('assets', false);
    await setCookie('company', false);
    await dispatch({ type: ADMIN_SESSION, payload: false });
    await dispatch({ type: SET_LOADING, payload: false });
    if (callback) {
      callback();
    }
  };

  return (
    <Switch>
      <DesktopLayout member={member} logout={handleLogout}>
        <Route path="/d" exact component={Dashboard} />
        <Route path="/d/company" exact component={CompanyInfo} />
        <Route path="/d/company/member" exact component={CompanyMemberInfo} />
        <Route path="/d/company/dept" exact component={CompanyDeptInfo} />
        <Route path="/d/customer" exact component={CustomerRegist} />
        <Route path="/d/customer/list" exact component={CustomerList} />
        <Route path="/d/medical" exact component={MedicalList} />
        <Route path="/d/medical/status" exact component={MedicalStatus} />
        <Route path="/d/medical/agreement" exact component={MedicalAgreement} />
        <Route path="/d/medical/reservation" exact component={Reservation} />
        <Route path="/d/survey" exact component={SurveyInfo} />
        <Route
          path="/d/statistics/customer"
          exact
          component={CustomerStatistics}
        />
        <Route path="/d/statistics/survey" exact component={SurveyStatistics} />
        <Route path="/d/alimtalk" exact component={Alimtalk} />
        <Route path="/d/wating" exact component={Wating} />
      </DesktopLayout>
    </Switch>
  );
};

export default Desktop;
