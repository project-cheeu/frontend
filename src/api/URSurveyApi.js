import URApiConstant from './URApiConstant';
import { ApiManager, SUCCESS_CODE } from '../utils';
const $http = new ApiManager();
// eslint-disable-next-line
export default {
  // SECTION 1 Survey
  insertSurveyAnswer: async (surveyAnswer) => {
    try {
      const url = URApiConstant.INSERT_SURVEY_ANSWER;
      const apiResult = await $http.post(url, surveyAnswer);
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
  getSurveyList: async (company_id) => {
    try {
      const url = URApiConstant.GET_SURVEY.replace(':company_id', company_id);
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

  // SECTION 2 Question
  insertQuestion: async (questionInfo) => {
    try {
      const url = URApiConstant.INSERT_SURVEY_QUESTION;
      const apiResult = await $http.post(url, questionInfo);
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
  removeQuestion: async (questionInfo) => {
    try {
      const url = URApiConstant.DELETE_SURVEY_QUESTION;
      const apiResult = await $http.delete(url, questionInfo);
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
  updateQuestion: async (questionInfo) => {
    try {
      const url = URApiConstant.PUT_SURVEY_QUESTION;
      const apiResult = await $http.put(url, questionInfo);
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

  // SECTION 3 Reply
  insertReply: async (replyInfo) => {
    try {
      const url = URApiConstant.INSERT_SURVEY_REPLY;
      const apiResult = await $http.post(url, replyInfo);
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
  removeReply: async (replyInfo) => {
    try {
      const url = URApiConstant.DELETE_SURVEY_REPLY;
      const apiResult = await $http.delete(url, replyInfo);
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
  updateReply: async (replyInfo) => {
    try {
      const url = URApiConstant.PUT_SURVEY_REPLY;
      const apiResult = await $http.put(url, replyInfo);
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
  toggleQuestion: async (questionInfo) => {
    try {
      const url = URApiConstant.TOGGLE_QUESTION;
      const apiResult = await $http.put(url, questionInfo);
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
  getSurveyAnswerList: async (surveyInfo) => {
    try {
      const { customer_id, company_id } = surveyInfo;
      const url = URApiConstant.GET_SURVEY_ANSWER_LIST.replace(
        ':customer_id',
        customer_id
      ).replace(':company_id', company_id);
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
