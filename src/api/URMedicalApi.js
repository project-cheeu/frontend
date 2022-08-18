import URApiConstant from './URApiConstant';
import { ApiManager, SUCCESS_CODE } from '../utils';
const $http = new ApiManager();
// eslint-disable-next-line
export default {
  insertMedicalInfo: async (medicalInfo) => {
    try {
      const url = URApiConstant.INSERT_MEIDICAL_INFO;
      const apiResult = await $http.post(url, medicalInfo);
      const { resultCode, resultMessage } = apiResult;
      if (resultCode === SUCCESS_CODE) {
        return true;
      }
      throw resultMessage;
    } catch (error) {
      return false;
    }
  },
  getMedicalList: async (company_id) => {
    try {
      const url = URApiConstant.GET_MEDICAL_LIST.replace(
        ':company_id',
        company_id
      ).replace(':type', 0);
      const apiResult = await $http.get(url);
      const { resultCode, resultData, resultMessage } = apiResult;
      if (resultCode === SUCCESS_CODE) {
        return resultData;
      }

      throw resultMessage;
    } catch (error) {
      return false;
    }
  },
  getMedicalStatus: async (company_id) => {
    try {
      const url = URApiConstant.GET_MEDICAL_LIST.replace(
        ':company_id',
        company_id
      ).replace(':type', 1);
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
  getMedicalDetail: async (medical_id) => {
    try {
      const url = URApiConstant.GET_MEDICAL_DETAIL.replace(
        ':medical_id',
        medical_id
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
  getMedicalListAll: async () => {
    try {
      const url = URApiConstant.GET_MEDICAL_LIST_ALL;
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
  updateMedicalStatus: async (medicalInfo) => {
    try {
      const url = URApiConstant.UPDATE_MEIDCAL;
      const apiResult = await $http.put(url, medicalInfo);
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
  insertMedicalSubject: async (subjectInfo) => {
    try {
      const url = URApiConstant.INSERT_MEDICAL_SUBJECT;
      const apiResult = await $http.post(url, subjectInfo);
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
  getMedicalSubjectList: async () => {
    try {
      const url = URApiConstant.GET_MEDICAL_SUBJECT_LIST;
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
  updateMedicalSubject: async (subjectInfo) => {
    try {
      const url = URApiConstant.UPDATE_MEDICAL_SUBJECT;
      const apiResult = await $http.put(url, subjectInfo);
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
  deleteMedicalSubject: async (subjectInfo) => {
    try {
      const url = URApiConstant.DELETE_MEDICAL_SUBJECT;
      const apiResult = await $http.delete(url, subjectInfo);
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
