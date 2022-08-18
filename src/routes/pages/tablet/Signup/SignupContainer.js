import React from 'react';
import SignupPresenter from './SignupPresenter';
import { useAppDispatch, useAppState } from 'context/MainContext';
import { URMedicalApi, URCustomerApi } from 'api/';
import { PLAY_AUDIO, SET_LOADING } from 'context/MainReducer';

/**
 * @title SignupContainer
 * @description 최초 방문 등록 컨테이너
 */
const SignupContainer = () => {
  const { member, company } = useAppState();
  const dispatch = useAppDispatch();

  /**
   * 전화번호로 사용자 검색
   * --
   * @param {*} num
   * @returns
   */
  const searchCustomer = async (num) => {
    await dispatch({ type: 'SET_LOADING', payload: true });
    return await URCustomerApi.searchCustomer(num).then((res) => {
      dispatch({ type: 'SET_LOADING', payload: false });
      if (res) {
        return res;
      }
      return false;
    });
  };

  /**
   * App 자체 로딩 진행
   * @param {*} time
   */
  const setLoading = (time = 1000) => {
    dispatch({ type: SET_LOADING, payload: true });
    setTimeout(() => {
      dispatch({ type: SET_LOADING, payload: false });
    }, time);
  };

  /**
   * 오디오 재생
   * --
   * @param {*} audio
   */
  const setAudio = async (audio) => {
    await dispatch({ type: PLAY_AUDIO, payload: audio });
  };

  /**
   * 진료 등록
   * --
   * @param {*} userInfo
   * @returns
   */
  const handleInsertMedical = async (userInfo) => {
    return await URMedicalApi.insertMedicalInfo(userInfo);
  };

  return (
    <SignupPresenter
      searchCustomer={searchCustomer}
      company={company}
      member={member}
      insertMedicalInfo={handleInsertMedical}
      setLoading={setLoading}
      setAudio={setAudio}
    />
  );
};

export default SignupContainer;
