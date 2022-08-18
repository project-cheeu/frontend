import URApiConstant from './URApiConstant';
import { ApiManager, SUCCESS_CODE } from '../utils';
const $http = new ApiManager();

// eslint-disable-next-line
export default {
  /**
   * @title checkManager
   * @description 매니저 여부 판단(앱 초기 설정을 위함)
   * @param {}
   * @return Success => Number
   * @return Failure => 0
   */
  checkManager: async () => {
    try {
      const url = URApiConstant.CHECK_MANAGER;
      const apiResult = await $http.get(url);
      const { resultCode, resultMessage } = apiResult;
      if (resultCode === SUCCESS_CODE) {
        return true;
      }

      throw resultMessage;
    } catch (error) {
      // console.log(error);
      return false;
    }
  },
  /**
   * @title insertManager
   * @description 매니저 등록
   * @param { manager_login_id, manager_login_pw, manager_am, created_at } managerInfo
   * @return Success => true
   * @return Failure => false
   */
  insertManager: async (managerInfo) => {
    try {
      const url = URApiConstant.INSERT_MANAGER;
      const apiResult = await $http.post(url, managerInfo);
      const { resultCode, resultMessage } = apiResult;
      if (resultCode === SUCCESS_CODE) {
        return true;
      }

      throw resultMessage;
    } catch (error) {
      // console.log(error);
      return false;
    }
  },
  /**
   * @title getManager
   * @description 매니저 조회
   * @param {}
   * @return Success => managerList
   * @return Failure => false
   */
  getManager: async () => {
    try {
      const url = URApiConstant.GET_MANAGER_LIST;
      const apiResult = await $http.get(url);
      const { resultCode, resultData, resultMessage } = apiResult;
      if (resultCode === SUCCESS_CODE) {
        return resultData;
      }

      throw resultMessage;
    } catch (error) {
      // console.log(error);
      return false;
    }
  },
};
