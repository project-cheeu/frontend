import React, { useEffect, useState } from 'react';
import { URDeptApi, URMemberApi } from 'api';
import { useAppDispatch, useAppState } from 'context/MainContext';
import { SET_LOADING } from 'context/MainReducer';
import CompanyMemberInfoPresenter from './CompanyMemberInfoPresenter';
import { MessageAlert } from 'utils';

const CompanyMemberInfoContainer = (props) => {
  const { company } = useAppState();
  const { company_id } = company;

  const dispatch = useAppDispatch();
  const [memberList, setMemberList] = useState([]);
  const [deptList, setDeptList] = useState([]);

  useEffect(() => {
    handleGetMemberList();
    handleGetDeptList();
    // eslint-disable-next-line
  }, []);

  /**
   * @title 멤버 목록 조회
   */
  const handleGetMemberList = async () => {
    await dispatch({ type: SET_LOADING, payload: true });
    const result = await URMemberApi.getMemberList(company_id);
    setMemberList(result);
    await dispatch({ type: SET_LOADING, payload: false });
  };

  /**
   * @title 부서 목록 조회
   */
  const handleGetDeptList = async () => {
    const result = await URDeptApi.selectDept(company_id);
    if (result) {
      setDeptList(result);
    }
  };

  /**
   * @title 부서 정보 변경
   * @param {Object} deptInfo 부서 정보
   * @returns
   */
  const handleSetMemberDept = async (deptInfo) => {
    const result = await URDeptApi.updateMemberDept(deptInfo);
    if (result) {
      MessageAlert.success('부서 변경 완료.');
      await handleGetMemberList();
      return true;
    }

    MessageAlert.error('부서 변경 실패');
    return false;
  };

  /**
   * @title 멤버 정보 등록
   * @param {Object} member 멤버 정보
   * @returns
   */
  const handleInsertMember = async (member) => {
    const memberInfo = {
      ...member,
      company_id: company_id,
    };
    const result = await URMemberApi.insertMember(memberInfo);
    if (result) {
      MessageAlert.success('직원 등록 성공');
      await handleGetMemberList();
      return true;
    }
    MessageAlert.error('직원 등록 실패');
    return false;
  };

  /**
   * @title 멤버 정보 수정
   * @param {Object} member 멤버 수정 정보
   * @returns
   */
  const handleUpdateMember = async (member) => {
    const memberInfo = {
      ...member,
      company_id: company_id,
    };
    const result = await URMemberApi.updateMember(memberInfo);
    if (result) {
      MessageAlert.success('직원 수정 성공');
      await handleGetMemberList();
      return true;
    }
    MessageAlert.error('직원 수정 실패');
    return false;
  };

  return (
    <CompanyMemberInfoPresenter
      memberList={memberList}
      deptList={deptList}
      setMemberDept={handleSetMemberDept}
      updateMember={handleUpdateMember}
      insertMember={handleInsertMember}
    />
  );
};

export default CompanyMemberInfoContainer;
