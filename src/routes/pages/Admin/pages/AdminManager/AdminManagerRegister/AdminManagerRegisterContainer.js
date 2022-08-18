import React, { useState } from 'react';
import AdminManagerRegisterPresenter from './AdminManagerRegisterPresenter';

const AdminManagerRegisterContainer = (props) => {
  const [adminInfo, setAdminInfo] = useState({});
  return (
    <AdminManagerRegisterPresenter
      adminInfo={adminInfo}
      setAdminInfo={setAdminInfo}
    />
  );
};

export default AdminManagerRegisterContainer;
