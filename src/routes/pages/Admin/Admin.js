import React, { useEffect } from 'react';
import { useAppDispatch, useAppState } from 'context/MainContext';
import { Route, Switch, useHistory } from 'react-router-dom';
import AdminLayout from 'components/layout/AdminLayout';
import { getCookie, setCookie } from 'utils';
import { ADMIN_SESSION, SET_LOADING } from 'context/MainReducer';
import {
  AdminCompanyList,
  AdminCompanyRegist,
  AdminDashboard,
  SurveyUpdate,
} from './pages';
import {
  AdminCustomerList,
  AdminCustomerRegister,
} from './pages/AdminCustomer';
import { AdminMedicalList, AdminMedicalStatus } from './pages/AdminMedical';
import { AdminManagerList, AdminManagerRegister } from './pages/AdminManager';
import { URAuthApi } from 'api';

const Admin = (props) => {
  const { admin } = useAppState();
  const dispatch = useAppDispatch();
  const history = useHistory();
  useEffect(() => {
    checkSession();
    // eslint-disable-next-line
  }, []);

  const checkSession = async () => {
    const check = await JSON.parse(getCookie('admin'));
    if (!check) {
      history.push('/');
      return;
    }

    const token = await getCookie('token');
    const verfiy = await URAuthApi.verifyToken(token);
    if (!verfiy) {
      logout();
    }
    dispatch({ type: ADMIN_SESSION, payload: check });
  };

  const logout = async () => {
    await dispatch({ type: SET_LOADING, payload: true });
    await setCookie('token', false);
    await setCookie('admin', false);
    await dispatch({ type: ADMIN_SESSION, payload: false });
    await dispatch({ type: SET_LOADING, payload: false });
    await history.push('/');
  };

  return (
    <Switch>
      {/* <Route path="/admin/signin" exact component={AdminSignin} /> */}
      <AdminLayout admin={admin} logout={logout}>
        <Route path="/a" exact component={AdminDashboard} />
        <Route path="/a/company" exact component={AdminCompanyRegist} />
        <Route path="/a/company/list" exact component={AdminCompanyList} />
        <Route path="/a/customer" exact component={AdminCustomerRegister} />
        <Route path="/a/customer/list" exact component={AdminCustomerList} />
        <Route path="/a/medical" exact component={AdminMedicalList} />
        <Route path="/a/medical/status" exact component={AdminMedicalStatus} />
        <Route path="/a/survey" exact component={SurveyUpdate} />
        <Route path="/a/manager" exact component={AdminManagerRegister} />
        <Route path="/a/manager/list" exact component={AdminManagerList} />
      </AdminLayout>
    </Switch>
  );
};

export default Admin;
