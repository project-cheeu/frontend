import URApiConstant from './URApiConstant';
import { ApiManager, SUCCESS_CODE } from '../utils';
const $http = new ApiManager();
// eslint-disable-next-line
export default {
  /**
   * @title 병원 자원 등록
   * @param {Object} assetsInfo 병원 자원 정보
   * @returns
   */
  insertCompanyAssets: async (assetsInfo) => {
    try {
      const url = URApiConstant.INSERT_COMPANY_ASSETS;
      const apiResult = await $http.post(url, assetsInfo);
      const { resultCode, resultData, resultMessage } = apiResult;
      if (resultCode === SUCCESS_CODE) {
        return resultData;
      }
      throw resultMessage;
    } catch (e) {
      return false;
    }
  },
  /**
   * @title 병원 자원 목록 조회
   * @returns
   */
  getCompanyAssetsList: async () => {
    try {
      const url = URApiConstant.GET_COMPANY_ASSETS_LIST;
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
  /**
   * @title 병원 자원 상세 조회
   * @param {String} company_id 병원 고유번호
   * @returns
   */
  getCompanyAssets: async (company_id) => {
    try {
      const url = URApiConstant.GET_COMPANY_ASSETS.replace(
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
  /**
   * @title 병원 자원 정보 수정
   * @param {Object} assetsInfo 병원 자원 정보
   * @returns
   */
  updateCompanyAssets: async (assetsInfo) => {
    try {
      const url = URApiConstant.UPDATE_COMPANY_ASSETS;
      const apiResult = await $http.put(url, assetsInfo);
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
