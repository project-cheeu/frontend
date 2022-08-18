import React, { useEffect, useState } from 'react';
import AdminManagerListPresenter from './AdminManagerListPresenter';
import { URManagerApi } from 'api';

const AdminManagerListContainer = (props) => {
  const [managerList, setManagerList] = useState([]);

  useEffect(() => {
    getManagerList();
  }, []);

  const getManagerList = async () => {
    const result = await URManagerApi.getManager();
    if (result) {
      await setManagerList(result);
    }
  };
  return <AdminManagerListPresenter managerList={managerList} />;
};

export default AdminManagerListContainer;
