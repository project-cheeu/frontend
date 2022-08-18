import URApiConstant from './URApiConstant';
import { ApiManager, SUCCESS_CODE } from '../utils';
const $http = new ApiManager();

// eslint-disable-next-line
export default {
  getDashboardAdmin: async () => {
    try {
      const url = URApiConstant.GET_DASHBOARD;
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
  getDashboard: async (company_id) => {
    try {
      const url = URApiConstant.GET_DASHBOARD.replace(
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
      return false;
    }
  },
  getDashboardCalendar: async (calendarInfo) => {
    try {
      const { company_id, month } = calendarInfo;
      const url = URApiConstant.GET_DASHBOARD_CALENDAR.replace(
        ':company_id',
        company_id
      ).replace(':month', month);
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
