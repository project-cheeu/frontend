import URApiConstant from './URApiConstant';
import { ApiManager, SUCCESS_CODE } from '../utils';
const $http = new ApiManager();

// eslint-disable-next-line
export default {
  getAlimtalk: async (company_id) => {
    try {
      const url = URApiConstant.GET_ALIMTALK.replace(':company_id', company_id);
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
  getAlimtalkList: async () => {
    try {
      const url = URApiConstant.GET_ALIMTALK_LIST;
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
