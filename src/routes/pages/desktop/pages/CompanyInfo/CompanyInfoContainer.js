import React, { useEffect, useState } from 'react';
import { URCompanyApi, URCompanyAssetsApi } from 'api';
import { useAppDispatch, useAppState } from 'context/MainContext';
import { SET_LOADING } from 'context/MainReducer';
import CompanyInfoPresenter from './CompanyInfoPresenter';
import { MessageAlert } from 'utils';

const CompanyInfoContainer = (props) => {
  /* State */
  const { company } = useAppState();
  const initalCompanyState = {
    company_addr: '',
    company_id: '',
    company_mail: '',
    company_nm: '',
    company_num: '',
    company_regist_num: '',
    company_tel: '',
    created_at: 0,
    depts: [],
    ebook_url: '',
    member_company: [],
    modified_at: 0,
    use_yn: 1,
  };

  const initalAssetsState = {
    assets_id: '',
    logo_url: '',
    ambient_environment: '',
    operating_time: '',
    company_id: '',
    company_thumbnail: undefined,
    company_guidance: '',
    company_signature: '',
  };
  const [companyInfo, setCompanyInfo] = useState(initalCompanyState);
  const [assetsInfo, setAssetsInfo] = useState(initalAssetsState);

  /* Hooks */
  const dispatch = useAppDispatch();

  useEffect(() => {
    handleGetComapny();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    handleGetAssets();
    // eslint-disable-next-line
  }, []);

  /* Functions */

  /**
   * 병원 정보 조회
   * --
   */
  const handleGetComapny = async () => {
    const { company_id } = company;
    await dispatch({ type: SET_LOADING, payload: true });
    const result = await URCompanyApi.getComapnyDetail(company_id);
    setCompanyInfo(result);
    await dispatch({ type: SET_LOADING, payload: false });
  };

  /**
   * @title 병원 자원 정보 조회
   */
  const handleGetAssets = async () => {
    const { company_id } = company;
    await dispatch({ type: SET_LOADING, payload: true });
    const result = await URCompanyAssetsApi.getCompanyAssets(company_id);
    if (result) {
      setAssetsInfo(result);
    } else {
      setAssetsInfo(initalAssetsState);
    }
    await dispatch({ type: SET_LOADING, payload: false });
  };

  /**
   * 병원정보 상태 변경 핸들러
   * --
   * @param {*} key
   * @param {*} value
   */
  const handleCompanyInfo = (key, value) => {
    setCompanyInfo({ ...companyInfo, [key]: value });
  };
  /**
   * 병원 정보 수정
   * --
   * @returns
   */
  const handleUpdateCompanyInfo = async () => {
    const result = await URCompanyApi.updateCompany(companyInfo);
    await dispatch({ type: SET_LOADING, payload: true });
    if (result) {
      await dispatch({ type: SET_LOADING, payload: false });
      await handleGetComapny();
      MessageAlert.success('정보 수정 완료');
      return true;
    }
    await dispatch({ type: SET_LOADING, payload: false });

    MessageAlert.error('정보 수정 실패');
    return false;
  };

  /**
   * @title 병원 자원 정보 등록/수정 핸들러
   */
  const handleAssetsSubmit = async () => {
    const { assets_id } = assetsInfo;
    if (assets_id === '') {
      return await handleInsertAssetsInfo();
    } else {
      return await handleUpdateAssetsInfo();
    }
  };

  /**
   * @title 병원 자원 정보 수정
   */
  const handleUpdateAssetsInfo = async () => {
    await dispatch({ type: SET_LOADING, payload: true });
    const result = await URCompanyAssetsApi.updateCompanyAssets(assetsInfo);
    if (result) {
      await handleGetAssets();
      MessageAlert.success('정보 수정 완료');
      await dispatch({ type: SET_LOADING, payload: false });
      return true;
    }
    MessageAlert.error('정보 수정 실패');
    await dispatch({ type: SET_LOADING, payload: false });
    return false;
  };

  /**
   * @title 병원 자원 정보 등록
   */
  const handleInsertAssetsInfo = async () => {
    const { company_id } = company;
    const { assets_id, ...postInfo } = assetsInfo;
    const postData = {
      ...postInfo,
      company_id,
    };
    await dispatch({ type: SET_LOADING, payload: true });
    const result = await URCompanyAssetsApi.insertCompanyAssets(postData);
    if (result) {
      await handleGetAssets();
      MessageAlert.success('정보 수정 완료');
      await dispatch({ type: SET_LOADING, payload: false });
      return true;
    }
    MessageAlert.error('정보 수정 실패');
    await dispatch({ type: SET_LOADING, payload: false });
    return false;
  };

  /* Render */
  return (
    <CompanyInfoPresenter
      companyInfo={companyInfo}
      assetsInfo={assetsInfo}
      setCompanyInfo={handleCompanyInfo}
      setAssetsInfo={setAssetsInfo}
      updateCompanyInfo={handleUpdateCompanyInfo}
      updateAssetsInfo={handleUpdateAssetsInfo}
      insertCompanyAssets={handleInsertAssetsInfo}
      handleAssetsSubmit={handleAssetsSubmit}
    />
  );
};

export default CompanyInfoContainer;
