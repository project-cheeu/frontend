import URApiConstant from './URApiConstant';
import { ApiManager, SUCCESS_CODE } from '../utils';
const $http = new ApiManager();

// eslint-disable-next-line
export default {
  /**
   * @title 병원 예약 일정 등록
   * @description 병원 예약 일정 등록
   * @returns
   */
  insertSchedule: async (scheduleInfo) => {
    try {
      const url = URApiConstant.INSERT_SCHEDULE;
      const apiResult = await $http.post(url, scheduleInfo);
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
  /**
   * @title 병원 예약 일정 조회
   * @description 병원 예약 일정 조회
   * @returns
   */
  getScheduleCompany: async (company_id) => {
    try {
      const url = URApiConstant.GET_SCHEDULE_COMPANY.replace(
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
  /**
   * @title 고객 예약 일정 조회
   * @description 고객 예약 일정 조회
   * @returns
   */
  getScheduleCustomer: async (customer_id) => {
    try {
      const url = URApiConstant.GET_SCHEDULE_COMPANY.replace(
        ':customer_id',
        customer_id
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
  /**
   * @title 예약 긴급 정지
   * @description 예약 긴급 정지
   * @returns
   */
  emergencyStop: async (scheduleInfo) => {
    try {
      const url = URApiConstant.EMERGENCY_STOP;
      const apiResult = await $http.put(url, scheduleInfo);
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

  /**
   * @title 예약 긴급 정지 복구
   * @description 예약 긴급 정지 복구
   * @returns
   */
  recoveryStop: async (scheduleInfo) => {
    try {
      const url = URApiConstant.RECOVER_STOP;
      const apiResult = await $http.put(url, scheduleInfo);
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
