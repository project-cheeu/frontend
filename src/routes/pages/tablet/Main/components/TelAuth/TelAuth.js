/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Dial, ModalLayout } from 'components';
import PhoneConfirm from './components/PhoneConfirm';
import { MessageAlert } from 'utils';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppState } from 'context/MainContext';
import { URCustomerApi, URMedicalApi } from 'api';
import { PLAY_AUDIO, SET_LOADING, SIGNUP_CUSTOMER } from 'context/MainReducer';
import './phonenumber.css';
const NUMBER_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, '✕', 0, '⬅'];

const TelAuth = (props) => {
  /* Router */
  const history = useHistory();

  /* State */
  const { company } = useAppState();
  const dispatch = useAppDispatch();
  const [tel, setTel] = useState('010-');
  const [visible, setVisible] = useState(false);
  const [userInfo, setUserInfo] = useState(undefined);

  /* Hooks */
  useEffect(() => {
    handleSearchCustomer();
    dispatch({ type: PLAY_AUDIO, payload: '' });

    // eslint-disable-next-line
  }, [tel]);

  /* Functions */
  /**
   * App의 로딩 진행
   * --
   * @param {*} time
   */
  const setLoading = (time = 1000) => {
    dispatch({ type: SET_LOADING, payload: true });
    setTimeout(() => {
      dispatch({ type: SET_LOADING, payload: false });
    }, time);
  };

  /**
   * 고객 검색
   * --
   * @param {*} num
   * @returns
   */
  const searchCustomer = async (num) => {
    await dispatch({ type: 'SET_LOADING', payload: true });
    const result = await URCustomerApi.searchCustomer(num);
    if (result && result.userList.length !== 0) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return result;
    }
    const { company_id } = company;
    const dumpResult = await URCustomerApi.searchCustomerDump({
      company_id,
      customer_tel: num,
    });
    // console.log(dumpResult);

    if (dumpResult) {
      return { userList: [], dumps: dumpResult };
    }
  };

  /**
   * 문진 등록 요청
   * --
   * @param {*} userInfo
   * @returns
   */
  const insertMedicalInfo = async (userInfo) => {
    return await URMedicalApi.insertMedicalInfo(userInfo);
  };

  /**
   * 문진 등록 핸들러
   * --
   * @param {*} item
   * @returns
   */
  const handleSubmit = async (item) => {
    const { customer_id } = item;
    const { company_id } = company;
    const reqUserInfo = {
      customer_id,
      company_id,
    };
    const result = await insertMedicalInfo(reqUserInfo);
    if (result) {
      dispatch({ type: PLAY_AUDIO, payload: 'done' });
      history.replace('/t/done');
      return true;
    }
    setTel('010-');
    setVisible(false);
    setUserInfo(undefined);
    MessageAlert.error('이미 등록되어있습니다.');
  };

  /**
   * 문진 팝업
   * --
   * @param {*} check
   */
  const handleSignUpPage = (check) => {
    console.log(check);
    if (check) {
      setUserInfo({ customer_tel: tel });
      dispatch({
        type: SIGNUP_CUSTOMER,
        payload: check[0],
      });
      history.push('/t/signup/terms/old');
    } else {
      setUserInfo({ ...userInfo, customer_tel: tel });
      dispatch({
        type: SIGNUP_CUSTOMER,
        payload: { ...userInfo, customer_tel: tel },
      });
      dispatch({ type: PLAY_AUDIO, payload: 'name' });
      history.push('/t/signup/name');
    }
  };

  /**
   * 고객 검색 요청
   * --
   * @returns
   */
  const handleSearchCustomer = async () => {
    if (tel.length > 13) {
      return;
    }
    if (tel.length === 13) {
      setLoading();

      const result = await searchCustomer(tel);
      const { dumps } = result;
      if (dumps && dumps.length > 0) {
        console.log(1);
      }
      setUserInfo(result);
      if (!result) {
        dispatch({ type: PLAY_AUDIO, payload: 'phone' });
      } else {
        dispatch({ type: PLAY_AUDIO, payload: 'starting' });
      }
      setVisible(true);
    }
  };

  /**
   * 전화번호 입력
   * --
   * @param {*} num
   * @returns
   */
  const handleSetTel = async (num) => {
    if (num === '✕') {
      setTel('010-');
      return;
    }
    if (tel !== '010' && num === '⬅') {
      setTel(tel.slice(0, -1));
      return;
    } else if (tel.length === 13) {
      return;
    }
    setTel(regexNum(tel + num));
  };

  /**
   * 문진 팝업 취소
   * --
   */
  const handleCancel = () => {
    setVisible(false);
    setTel('010-');
    MessageAlert.warning('전화번호를 다시 입력해주세요.', 5);
    dispatch({ type: PLAY_AUDIO, payload: '' });
  };

  /**
   * 전화번호 정규표현식
   * --
   * @param {*} str
   * @returns
   */
  const regexNum = (str) => {
    str = str.replace(/[^0-9]/g, '');
    var tmp = '';
    if (str.length < 4) {
      return str;
    } else if (str.length < 7) {
      tmp += str.substr(0, 3);
      tmp += '-';
      tmp += str.substr(3);
      return tmp;
    } else if (str.length < 11) {
      tmp += str.substr(0, 3);
      tmp += '-';
      tmp += str.substr(3, 3);
      tmp += '-';
      tmp += str.substr(6);
      return tmp;
    } else {
      tmp += str.substr(0, 3);
      tmp += '-';
      tmp += str.substr(3, 4);
      tmp += '-';
      tmp += str.substr(7);
      return tmp;
    }
  };

  return (
    <div className="phonenumber-container">
      <Dial
        numList={NUMBER_LIST}
        dialAction={handleSetTel}
        header={<div className="phone-input">{tel}</div>}
      />
      <ModalLayout
        title="고객 정보 확인"
        width=""
        modal={visible}
        setModal={setVisible}
      >
        <PhoneConfirm
          userInfo={userInfo}
          submitAction={handleSubmit}
          signupAction={handleSignUpPage}
          handleCancel={handleCancel}
        />
      </ModalLayout>
    </div>
  );
};

export default TelAuth;
