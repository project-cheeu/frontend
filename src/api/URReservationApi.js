import URApiConstant from './URApiConstant';
import { ApiManager, SUCCESS_CODE } from '../utils';
const $http = new ApiManager();

// eslint-disable-next-line
export default {
  /**
   * @title getReservationListAll
   * @description 예약 전체 목록 조회
   * @returns
   */
  getReservationListAll: async () => {
    try {
      const url = URApiConstant.GET_RESERVATION_LIST_ALL;
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
   * @title getReservationListCompany
   * @description 병원별 예약 목록 조회
   * @returns
   */
  getReservationListCompany: async (company_id) => {
    try {
      const url = URApiConstant.GET_RESERVATION_COMPANY.replace(
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
   * @title getReservationListCustomer
   * @description 고객별 예약 목록 조회
   * @returns
   */
  getReservationListCustomer: async (customer_id) => {
    try {
      const url = URApiConstant.GET_RESERVATION_CUSTOMER.replace(
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
   * @title updateReservation
   * @description 예약 정보 수정
   * @returns
   */
  updateReservation: async (reservationInfo) => {
    try {
      const url = URApiConstant.UPDATE_RESERVATION;
      const apiResult = await $http.put(url, reservationInfo);
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
   * @title insertReservationInfo
   * @description 예약 설정 등록
   * @returns
   */
  insertReservationInfo: async (reservationInfo) => {
    try {
      const url = URApiConstant.INSERT_RESERVATION_INFO;
      const apiResult = await $http.post(url, reservationInfo);
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
   * @title getReservationInfoAll
   * @description 예약 설정 전체 조회
   * @returns
   */
  getReservationInfoAll: async () => {
    try {
      const url = URApiConstant.GET_RESERVATION_INFO_ALL;
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
   * @title getReservationInfo
   * @description 예약 설정 병원 조회
   * @returns
   */
  getReservationInfo: async (company_id) => {
    try {
      const url = URApiConstant.GET_RESERVATION_COMPANY.replace(
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
   * @title updateReservationInfo
   * @description 예약 설정 수정
   * @returns
   */
  updateReservationInfo: async (reservationInfo) => {
    try {
      const url = URApiConstant.UPDATE_RESERVATION_INFO;
      const apiResult = await $http.put(url, reservationInfo);
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
   * @title deleteReservationInfo
   * @description 예약 설정 삭제
   * @returns
   */
  deleteReservationInfo: async (reservationInfo) => {
    try {
      const url = URApiConstant.DELETE_RESERVATION_INFO;
      const apiResult = await $http.delete(url, reservationInfo);
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
