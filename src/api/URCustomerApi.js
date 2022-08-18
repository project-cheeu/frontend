import URApiConstant from './URApiConstant';
import { ApiManager, SUCCESS_CODE } from '../utils';
const $http = new ApiManager();
// eslint-disable-next-line
export default {
  /**
   * @title searchCustomer
   * @description 전화번호로 회원이 가입했는지 확인
   * @param {customer_tel} customerInfo
   * @return Success => customerInfo
   * @return Failure => false
   */
  searchCustomer: async (customer_tel) => {
    try {
      const url = URApiConstant.SEARCH_CUSTOMER;
      const apiResult = await $http.post(url, { customer_tel });
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
   * @title insertCustomer
   * @description 회원 등록
   * @param { customer_nm, customer_tel, customer_addr, customer_num, agree_date, access_platform, member_id } customerInfo
   * @return Success => customer_id
   * @return Failure => false
   */
  insertCustomer: async (customerInfo) => {
    try {
      const url = URApiConstant.INSERT_CUSTOMER;
      const apiResult = await $http.post(url, customerInfo);
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
   * @title getCustomerDetail
   * @description 회원 상세 정보 조회
   * @param {member_id, customer_id} customer_detail
   * @return Success => customer_detail()
   * @return Failure => false
   */
  getCustomerDetail: async (customer_detail) => {
    try {
      const { company_id, customer_id } = customer_detail;
      const url = URApiConstant.GET_CUSTOMER_DETAIL.replace(
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
  /**
   * @title getCustomerMedical
   * @description 회원 상세 정보 조회
   * @param {customer_id} customer_detail
   * @return Success => customer_detail()
   * @return Failure => false
   */
  getCustomerMedical: async (customer_detail) => {
    try {
      const { customer_id } = customer_detail;
      const url = URApiConstant.GET_CUSTOMER_MEDICAL.replace(
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
   * @title getCustomerListAll
   * @description 회원 전체 정보 조회
   * @param {}
   * @return Success => customerList
   * @return Failure => false
   */
  getCustomerListAll: async () => {
    try {
      const url = URApiConstant.GET_CUSTOMER_LIST_ALL;
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
   * @title getCustomerListByCompanyId
   * @description 병원별 회원 정보 조회
   * @param {}
   * @return Success => customerList
   * @return Failure => false
   */
  getCustomerListByCompanyId: async (company_id) => {
    try {
      const url = URApiConstant.GET_CUSTOMER_COMPANY.replace(
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
   * @title insertSingleCustomer
   * @description 회원정보 단일 입력
   * @param {}
   * @return Success => customerList
   * @return Failure => false
   */
  insertSingleCustomer: async (customerInfo) => {
    try {
      const url = URApiConstant.INSERT_CUSTOMER_SINGLE;
      const apiResult = await $http.post(url, customerInfo);
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
   * @title insertBulkCustomer
   * @description 회원정보 다수 입력
   * @param {}
   * @return Success => customerList
   * @return Failure => false
   */
  insertBulkCustomer: async (bulks) => {
    try {
      const url = URApiConstant.INSERT_BULK_CUSTOMER;
      const apiResult = await $http.post(url, bulks);
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
   * @title getCustomerDump
   * @description 고객 덤프 정보 조회
   * @param {}
   * @return Success => customerList
   * @return Failure => false
   */
  getCustomerDump: async (company_id) => {
    try {
      const url = URApiConstant.GET_CUSTOMER_DUMP.replace(
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
   * @title searchCustomerDump
   * @description 고객 덤프 정보 조회
   * @param {}
   * @return Success => customerList
   * @return Failure => false
   */
  searchCustomerDump: async (dumpInfo) => {
    try {
      const { company_id, customer_tel } = dumpInfo;
      const url = URApiConstant.SEARCH_CUSTOMER_DUMP.replace(
        ':company_id',
        company_id
      ).replace(':customer_tel', customer_tel);
      const apiResult = await $http.get(url);
      const { resultCode, resultData, resultMessage } = apiResult;
      console.log(apiResult);
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
