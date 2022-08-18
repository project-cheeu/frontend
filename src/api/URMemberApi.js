import URApiConstant from './URApiConstant';
import { ApiManager, SUCCESS_CODE } from '../utils';
const $http = new ApiManager();
// eslint-disable-next-line
export default {
  insertMember: async (memberInfo) => {
    try {
      const url = URApiConstant.INSERT_MEMBER;
      const apiResult = await $http.post(url, memberInfo);
      const { resultCode, resultData, resultMessage } = apiResult;
      if (resultCode === SUCCESS_CODE) {
        return resultData;
      }
      throw resultMessage;
    } catch (e) {
      return false;
    }
  },
  getMemberList: async (company_id) => {
    try {
      const url = URApiConstant.GET_COMPANY_MEMBER_LIST.replace(
        ':company_id',
        company_id
      );
      const apiResult = await $http.get(url);
      const { resultCode, resultData, resultMessage } = apiResult;
      if (resultCode === SUCCESS_CODE) {
        return resultData;
      }
      throw resultMessage;
    } catch (e) {
      return false;
    }
  },
  updateMember: async (memberInfo) => {
    try {
      const url = URApiConstant.UPDATE_MEMBER;
      const apiResult = await $http.put(url, memberInfo);
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
