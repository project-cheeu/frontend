import React, { useState } from 'react';
import {
  Name,
  PhoneNumber,
  RegistNumber,
  Address,
  Terms,
  _Terms,
} from './components';
import { Route, Switch, useHistory } from 'react-router-dom';
import './Signup.css';
import { MessageAlert } from 'utils/';
import { URCustomerApi } from 'api/';
import { useAppState } from 'context/MainContext';

const SignupPresenter = ({
  searchCustomer,
  member,
  company,
  insertMedicalInfo,
  setLoading,
  setAudio,
}) => {
  /* Router */
  const history = useHistory();

  /* State */
  const { customer } = useAppState();

  const [tel, setTel] = useState('010-');
  const [visible, setVisible] = useState(false);
  const [userInfo, setUserInfo] = useState(customer);
  const [insertLoading, setInsertLoading] = useState(false);

  /* Functions */
  /**
   * 환자 전화번호 입력
   * --
   * @param {*} num
   * @returns
   */
  const handleSetTel = async (num) => {
    const { company_id } = company;
    if (num.length > 13) {
      return;
    }
    await setTel(num);
    if (num.length === 13) {
      setLoading();
      const result = await searchCustomer(num);
      const { userList } = result;
      if (userList.length === 0) {
        const dumpResult = await URCustomerApi.searchCustomerDump({
          company_id,
          customer_tel: num,
        });
        console.log(dumpResult);
        setUserInfo({ dumps: dumpResult });
      } else {
        setUserInfo(result);
      }
      // setUserInfo(result);
      setVisible(true);
    }
  };

  /**
   * 환자 정보 입력 핸들러
   * --
   * @param {*} key
   * @param {*} value
   */
  const handleUserInfo = async (key, value) => {
    await setUserInfo({ ...userInfo, [key]: value });
  };

  /**
   * 환자 접수
   * --
   * @returns
   */
  const handleSubmit = async (data) => {
    const { company_id } = company;
    const { customer_id } = data;
    const reqUserInfo = {
      customer_id,
      company_id,
    };
    const result = await insertMedicalInfo(reqUserInfo);
    if (result) {
      history.replace('/t/done');
      return;
    }
    // setTel('010-');
    // setVisible(false);
    // setUserInfo(undefined);
    // MessageAlert.error('이미 등록되어있습니다.');
  };

  /**
   * 환자 가입 시퀀스 - 이름 등록으로 이동
   * --
   */
  const handleSignUpPage = () => {
    setUserInfo({ ...userInfo, customer_tel: tel });
    history.replace('/t/signup/name');
  };

  /**
   * 환자 가입 시퀀스 - 구환
   * --
   */
  const handleOldSignUpPage = async (data) => {
    // console.log('test', data);
    // const [firstData] = data;
    // const { customer_tel, customer_nm } = firstData;
    // setUserInfo({ ...userInfo, customer_tel, customer_nm });
    // history.replace('/t/signup/name');
    console.log(data);
    const [firstData] = data;
    setInsertLoading(true);
    const {
      company_id,
      customer_addr,
      customer_nm,
      customer_num,
      customer_tel,
    } = firstData;
    const result = await URCustomerApi.insertCustomer({
      company_id,
      customer_addr,
      customer_nm,
      customer_num,
      customer_tel,
    });
    if (result) {
      history.replace('/t/done');
      setInsertLoading(false);
      return true;
    }
    MessageAlert.warning('잘못된 정보입니다. 접수처에서 문의해주세요.');
    return false;
  };

  /**
   * 환자 가입 시퀀스 - 이름 검증 후 주민등록번호로 이동
   * --
   */
  const handleValidateName = async () => {
    if (userInfo.customer_nm) {
      await history.push('/t/signup/number');
    } else {
      MessageAlert.warning('이름을 제대로 입력해주세요.');
    }
  };

  /**
   * 환자 가입 시퀀스 - 주소 입력으로 이동
   * --
   * 검증은 주민등록번호 컴포넌트에서 진행
   */
  const handleValidateNum = async () => {
    await history.push('/t/signup/address');
  };

  /**
   * 환자 가입 시퀀스 - 주소 입력 후 이용약관 동의로 이동
   * --
   * @param {*} addr
   */
  const handleValidateAddress = async (addr) => {
    await handleUserInfo('customer_addr', addr);
    await history.push('/t/signup/terms');
  };

  /**
   * 환자 등록
   * --
   * @param {*} customerInfo
   * @returns
   */
  const handleInsertCustomer = async (customerInfo) => {
    setInsertLoading(true);
    const result = await URCustomerApi.insertCustomer(customerInfo);
    if (result) {
      history.replace('/t/done');
      setInsertLoading(false);
      return true;
    }
    MessageAlert.warning('잘못된 정보입니다. 접수처에서 문의해주세요.');
    return false;
  };

  return (
    <div className="signup-presenter">
      <Switch>
        <Route path="/t/signup/terms/old" exact>
          {/* eslint-disable-next-line  */}
          <_Terms
            userInfo={userInfo}
            setUserInfo={handleUserInfo}
            handleSubmit={handleInsertCustomer}
            // member={member}
            company={company}
            setLoading={setLoading}
            setAudio={setAudio}
            insertLoading={insertLoading}
          />
        </Route>
        <Route path="/t/signup/terms" exact>
          <Terms
            userInfo={userInfo}
            setUserInfo={handleUserInfo}
            handleSubmit={handleInsertCustomer}
            // member={member}
            company={company}
            setLoading={setLoading}
            setAudio={setAudio}
            insertLoading={insertLoading}
          />
        </Route>
        <Route path="/t/signup" exact>
          <Terms
            userInfo={userInfo}
            setUserInfo={handleUserInfo}
            handleSubmit={handleInsertCustomer}
            company={company}
            setLoading={setLoading}
            setAudio={setAudio}
            insertLoading={insertLoading}
            start={true}
          />
        </Route>
        <Route path="/t/signup/old" exact>
          <Terms
            userInfo={userInfo}
            setUserInfo={handleUserInfo}
            handleSubmit={handleInsertCustomer}
            company={company}
            setLoading={setLoading}
            setAudio={setAudio}
            insertLoading={insertLoading}
            start={true}
            dump={true}
          />
        </Route>
        <Route path="/t/signup/num" exact>
          <PhoneNumber
            tel={tel}
            setTel={handleSetTel}
            visible={visible}
            setVisible={setVisible}
            userInfo={userInfo}
            submitAction={handleSubmit}
            signupAction={handleSignUpPage}
            setAudio={setAudio}
          />
        </Route>
        <Route path="/t/signup/num/old" exact>
          <PhoneNumber
            tel={tel}
            setTel={handleSetTel}
            visible={visible}
            setVisible={setVisible}
            userInfo={userInfo}
            submitAction={handleSubmit}
            signupAction={handleSignUpPage}
            signupOldAction={handleOldSignUpPage}
            setAudio={setAudio}
            dump={true}
          />
        </Route>
        <Route path="/t/signup/name" exact>
          <Name
            userName={userInfo}
            setUserInfo={handleUserInfo}
            next={handleValidateName}
            setLoading={setLoading}
            setAudio={setAudio}
          />
        </Route>
        <Route path="/t/signup/number" exact>
          <RegistNumber
            userInfo={userInfo}
            setUserInfo={handleUserInfo}
            prev={() => history.goBack()}
            next={handleValidateNum}
            setLoading={setLoading}
            setAudio={setAudio}
          />
        </Route>
        <Route path="/t/signup/address" exact>
          <Address
            next={handleValidateAddress}
            prev={() => history.goBack()}
            userInfo={userInfo}
            setUserInfo={handleUserInfo}
            setLoading={setLoading}
            setAudio={setAudio}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default SignupPresenter;
