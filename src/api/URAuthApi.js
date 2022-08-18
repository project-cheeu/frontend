import URApiConstant from './URApiConstant';
import { ApiManager, SUCCESS_CODE } from '../utils';
const $http = new ApiManager();
// eslint-disable-next-line
export default {
  /**
   * @title signin
   * @description 병원 사원 로그인
   * @param { member_login_id, member_login_pw } loginInfo
   */
  signin: async (loginInfo) => {
    try {
      const url = URApiConstant.SIGNIN;
      const apiResult = await $http.post(url, loginInfo);
      const { resultCode, resultData, resultMessage } = apiResult;
      if (resultCode === SUCCESS_CODE) {
        return resultData;
      }
      throw resultMessage;
    } catch (e) {
      return false;
    }
  },
  /**
   * @title managerSignin
   * @description 관리자 로그인
   * @param {manager_login_id, manager_login_pw} loginInfo
   */
  managerSignin: async (loginInfo) => {
    try {
      const url = URApiConstant.MANAGER_SIGNIN;
      const apiResult = await $http.post(url, loginInfo);
      const { resultCode, resultData, resultMessage } = apiResult;
      if (resultCode === SUCCESS_CODE) {
        return resultData;
      }
      throw resultMessage;
    } catch (e) {
      return false;
    }
  },

  /**
   * @title verifyToken
   * @description 토큰 입증
   * @param token
   */
  verifyToken: async (token) => {
    try {
      const url = URApiConstant.VERIFY_TOKEN;
      const apiResult = await $http.post(url, { token });
      const { resultCode, resultData, resultMessage } = apiResult;
      if (resultCode === SUCCESS_CODE) {
        return resultData;
      }
      throw resultMessage;
    } catch (e) {
      return false;
    }
  },
};
