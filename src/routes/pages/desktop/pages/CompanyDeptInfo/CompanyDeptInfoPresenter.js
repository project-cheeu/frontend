import React, { useState } from 'react';
import { AdminGrid } from 'components';
import { DeptDisplay, DeptRegist } from './components';

const CompanyDeptInfoPresenter = ({
  dept,
  memberList,
  insertDept,
  updateDept,
}) => {
  const [visible, setVisible] = useState(false);
  const [deptInfo, setDeptInfo] = useState({});
  const [update, setUpdate] = useState(false);

  const onInsertDept = async () => {
    return await insertDept(deptInfo);
  };

  const onUpdateDept = async () => {
    return await updateDept(deptInfo);
  };

  const onUpdateTrigger = (dept) => {
    setDeptInfo(dept);
    setUpdate(true);
    setVisible(true);
  };

  return (
    <AdminGrid>
      <DeptRegist
        visible={visible}
        setVisible={setVisible}
        deptInfo={deptInfo}
        setDeptInfo={setDeptInfo}
        memberList={memberList}
        insertDept={onInsertDept}
        updateDept={onUpdateDept}
        update={update}
      />
      <DeptDisplay
        dept={dept}
        setVisible={setVisible}
        updateTrigger={onUpdateTrigger}
      />
    </AdminGrid>
  );
};

export default CompanyDeptInfoPresenter;
