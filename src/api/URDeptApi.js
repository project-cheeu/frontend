import URApiConstant from './URApiConstant';
import { ApiManager, SUCCESS_CODE } from '../utils';
const $http = new ApiManager();
// eslint-disable-next-line
export default {
  insertDept: async (dept_info) => {
    try {
      const url = URApiConstant.INSERT_DEPT;
      const apiResult = await $http.post(url, dept_info);
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
  selectDept: async (company_id) => {
    try {
      const url = URApiConstant.GET_DEPT_LIST.replace(
        ':company_id',
        company_id
      );
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
  updateDept: async (deptInfo) => {
    try {
      const url = URApiConstant.UPDATE_DEPT;
      const apiResult = await $http.put(url, deptInfo);
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
  insertMemberDept: async (memberDept) => {
    try {
      const url = URApiConstant.REGIST_DEPT_MEMBER;
      const apiResult = await $http.post(url, memberDept);
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
  updateMemberDept: async (memberDept) => {
    try {
      const url = URApiConstant.UPDATE_DEPT_MEMBER;
      const apiResult = await $http.put(url, memberDept);
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
