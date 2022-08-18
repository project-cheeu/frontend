import URApiConstant from './URApiConstant';
import { ApiManager, SUCCESS_CODE } from '../utils';
const $http = new ApiManager();

// eslint-disable-next-line
export default {
  insertAgreementForm: async (formData) => {
    try {
      const url = URApiConstant.INSERT_AGREEMENT_FORM;
      const apiResult = await $http.post(url, formData);
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
  getAgreementFormList: async (company_id) => {
    try {
      const url = URApiConstant.GET_AGREEMENT_FORM_LIST.replace(
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
  insertUserAgreement: async (postData) => {
    try {
      const url = URApiConstant.INSERT_USER_AGREEMENT;
      const apiResult = await $http.post(url, postData);
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
  getUserAgreement: async (getData) => {
    try {
      const { company_id, customer_id } = getData;
      const url = URApiConstant.GET_USER_AGREEMENT.replace(
        ':company_id',
        company_id
      ).replace(':customer_id', customer_id);
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
  updateAgreementForm: async (formData) => {
    try {
      const url = URApiConstant.UPDATE_AGREEMENT_FORM;
      const apiResult = await $http.put(url, formData);
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
  deleteAgreementForm: async (form_id) => {
    try {
      const url = URApiConstant.DELETE_AGREEMENT_FORM;
      const apiResult = await $http.delete(url, { form_id });
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
