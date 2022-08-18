import URApiConstant from './URApiConstant';
import { ApiManager, SUCCESS_CODE } from '../utils';
const $http = new ApiManager();
// eslint-disable-next-line
export default {
  /**
   * @title insertCompany
   * @description 병원 등록
   * @param {company_nm,company_tel,company_addr,company_mail,company_num,company_regist_num,created_at,modify_at,use_yn} companyInfo
   * @return Success => company_id
   * @return Failure => false
   */
  insertCompany: async (companyInfo) => {
    try {
      const url = URApiConstant.INSERT_COMPANY;
      const apiResult = await $http.post(url, companyInfo);
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
   * @title getCompanyList
   * @description 회사 전체 목록 조회
   * @param {}
   */
  getCompanyList: async () => {
    try {
      const url = URApiConstant.GET_COMPANY_LIST;
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
   * @title signupCompany
   * @description 회사 정보 등록
   * @param { company_nm,company_tel,company_addr,company_mail,company_num,company_regist_num,created_at,modify_at,use_yn } company_info
   * @param { dept_nm } dept_info
   * @param { member_login_id, member_login_pw, member_nm, member_div } member_info
   */
  signupCompany: async (signupInfo) => {
    try {
      const url = URApiConstant.SIGNUP_COMPANY;
      const apiResult = await $http.post(url, signupInfo);
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
   * @title getCompanyList
   * @description 회사 전체 목록 조회
   * @param company_id
   */
  getComapnyDetail: async (company_id) => {
    try {
      const url = URApiConstant.GET_COMPAN_DETAIL.replace(
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

  /**
   * @title updateCompany
   * @description 회사 정보 수정
   * @param company_id
   */
  updateCompany: async (companyInfo) => {
    try {
      const url = URApiConstant.UPDATE_COMPANY;
      const apiResult = await $http.put(url, companyInfo);
      const { resultCode, resultData, resultMessage } = apiResult;
      if (resultCode === SUCCESS_CODE) {
        return resultData;
      }
      throw resultMessage;
    } catch (error) {
      return false;
    }
  },
};
