import { URDeptApi, URMemberApi } from 'api';
import { useAppState } from 'context/MainContext';
import React, { useEffect, useState } from 'react';
import { MessageAlert } from 'utils';
import CompanyDeptInfoPresenter from './CompanyDeptInfoPresenter';

const CompanyDeptInfoContainer = () => {
  const { company } = useAppState();
  const { company_id } = company;

  const [dept, setDept] = useState([]);
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    selectDeptInfo();
    selectMemberList();
    // eslint-disable-next-line
  }, []);

  const selectDeptInfo = async () => {
    const result = await URDeptApi.selectDept(company_id);
    if (result) {
      setDept(result);
    }
  };

  const selectMemberList = async () => {
    const result = await URMemberApi.getMemberList(company_id);
    if (result) {
      setMemberList(result);
    }
  };

  const handleInsertDept = async (dept) => {
    const deptInfo = {
      ...dept,
      company_id: company_id,
    };
    const result = await URDeptApi.insertDept(deptInfo);
    if (result) {
      MessageAlert.success('부서등록이 성공했습니다.');
      await selectDeptInfo();
      return true;
    }
    MessageAlert.error('부서등록에 실패했습니다.');
    return false;
  };

  const handleUpdateSept = async (dept) => {
    const deptInfo = {
      ...dept,
      company_id: company_id,
    };
    const result = await URDeptApi.updateDept(deptInfo);
    if (result) {
      MessageAlert.success('부서수정이 성공했습니다.');
      await selectDeptInfo();
      return true;
    }
    MessageAlert.error('부서수정에 실패했습니다.');
    return false;
  };

  return (
    <CompanyDeptInfoPresenter
      dept={dept}
      memberList={memberList}
      insertDept={handleInsertDept}
      updateDept={handleUpdateSept}
    />
  );
};

export default CompanyDeptInfoContainer;
