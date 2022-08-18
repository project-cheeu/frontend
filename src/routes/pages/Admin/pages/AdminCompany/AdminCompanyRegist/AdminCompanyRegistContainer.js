import { URCompanyApi } from 'api';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { MessageAlert } from 'utils';
import AdminCompanyRegistPresenter from './AdminCompanyRegistPresenter';

const AdminCompanyRegistContainer = (props) => {
  /* Router */
  const history = useHistory();

  /* State */
  /* Hooks */

  /* Functions */
  const handleSignupCompany = async (signupInfo) => {
    const result = await URCompanyApi.signupCompany(signupInfo);
    console.log(result);
    if (result) {
      MessageAlert.success('병원 정보등록에 성공했습니다.');
      history.push('/a/company/list');
      return true;
    }
    MessageAlert.error(
      '병원정보등록에 실패했습니다. 입력 정보를 확인해주세요.'
    );
    return false;
  };
  /* Render */
  return <AdminCompanyRegistPresenter insertCompany={handleSignupCompany} />;
};

export default AdminCompanyRegistContainer;
