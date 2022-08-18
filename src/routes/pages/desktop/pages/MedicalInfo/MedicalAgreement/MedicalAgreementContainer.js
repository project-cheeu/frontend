import { URAgreementApi } from 'api';
import { useAppState } from 'context/MainContext';
import React, { useEffect, useState } from 'react';
import { MessageAlert } from 'utils';
import MedicalAgreementPresenter from './MedicalAgreementPresenter';

const MedicalAgreementContainer = (props) => {
  /* State */
  const [agreementList, setAgreementList] = useState([]);
  const { company } = useAppState();
  const { company_id } = company;

  /* Hooks */
  useEffect(() => {
    handleGetAgreementFormList();
    // eslint-disable-next-line
  }, []);
  /* Functions */
  /**
   * 동의서 리스트 조회
   * --
   */
  const handleGetAgreementFormList = async () => {
    const result = await URAgreementApi.getAgreementFormList(company_id);
    if (result) {
      setAgreementList(result);
    }
  };

  /**
   * 동의서 등록
   * --
   * @param {*} formData
   * @returns
   */
  const handleInsertAgreementForm = async (formData) => {
    const result = await URAgreementApi.insertAgreementForm(formData);
    if (result) {
      MessageAlert.success('등록에 성공했습니다.');
      handleGetAgreementFormList();
      return true;
    }
    MessageAlert.error('등록에 실패했습니다.');
    return false;
  };

  /**
   * 동의서 수정
   * --
   * @param {*} formData
   * @returns
   */
  const handleAgreementFromUpdate = async (formData) => {
    const result = await URAgreementApi.updateAgreementForm(formData);
    if (result) {
      MessageAlert.success('동의서 수정 완료');
      await handleGetAgreementFormList();
      return true;
    }
    MessageAlert.error('동의서 수정 실패');

    return false;
  };

  /**
   * 동의서 삭제
   * --
   * @param {String} form_id
   * @returns
   */
  const handleDeleteForm = async (form_id) => {
    const result = await URAgreementApi.deleteAgreementForm(form_id);
    if (result) {
      MessageAlert.success('동의서 삭제 완료');
      await handleGetAgreementFormList();
      return true;
    }
    MessageAlert.error('동의서 삭제 실패');

    return false;
  };

  /* Renders */
  return (
    <MedicalAgreementPresenter
      agreementList={agreementList}
      insertForm={handleInsertAgreementForm}
      updateForm={handleAgreementFromUpdate}
      company_id={company_id}
      deleteForm={handleDeleteForm}
    />
  );
};

export default MedicalAgreementContainer;
