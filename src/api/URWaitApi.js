import URApiConstant from './URApiConstant';
import { ApiManager, SUCCESS_CODE } from '../utils';
const $http = new ApiManager();

// eslint-disable-next-line
export default {
  /**
   * 공지사항 등록 요청
   * --
   * @param {Object} noticeInfo 공지 정보
   * @returns
   */
  insertNotice: async (noticeInfo) => {
    try {
      const url = URApiConstant.INSERT_NOTICE;
      const apiResult = await $http.post(url, noticeInfo);
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
   * 공지사항 조회
   * --
   * @param {String} company_id 병원 고유 코드
   * @returns
   */
  getNoticeList: async (company_id) => {
    try {
      const url = URApiConstant.GET_NOTICE_LIST.replace(
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
   * 공지사항 정보 수정
   * --
   * @param {Object} noticeInfo 공지사항 정보
   * @returns
   */
  updateNotice: async (noticeInfo) => {
    try {
      const url = URApiConstant.UPDATE_NOTICE;
      const apiResult = await $http.put(url, noticeInfo);
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
   * 공지사항 정보 삭제
   * --
   * @param {Object} noticeInfo 공지사항 정보
   * @returns
   */
  deleteNotice: async (noticeInfo) => {
    try {
      const url = URApiConstant.DELETE_NOTICE;
      const apiResult = await $http.delete(url, noticeInfo);
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
   * 비디오 정보 등록(재생목록)
   * --
   * @param {Object} videoInfo 비디오 정보
   * @returns
   */
  insertVideo: async (videoInfo) => {
    try {
      const url = URApiConstant.INSERT_VIDEO;
      const apiResult = await $http.post(url, videoInfo);
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
   * 비디오 목록 조회
   * --
   * @param {String} company_id 병원 고유 번호
   * @returns
   */
  getVideoList: async (company_id) => {
    try {
      const url = URApiConstant.GET_VIDEO_LIST.replace(
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
   * 비디오 정보 수정
   * --
   * @param {Object} videoInfo 비디오 정보
   * @returns
   */
  updateVideo: async (videoInfo) => {
    try {
      const url = URApiConstant.UPDATE_VIDEO;
      const apiResult = await $http.put(url, videoInfo);
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
   * 비디오 정보 삭제
   * --
   * @param {Object} videoInfo 비디오 정보
   * @returns
   */
  deleteVideo: async (videoInfo) => {
    try {
      const url = URApiConstant.DELETE_VIDEO;
      const apiResult = await $http.delete(url, videoInfo);
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
