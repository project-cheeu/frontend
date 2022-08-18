import URApiConstant from './URApiConstant';
import { ApiManager, SUCCESS_CODE } from '../utils';
const $http = new ApiManager();

// eslint-disable-next-line
export default {
  getCustomerCountByYear: async (dateInfo) => {
    try {
      const { type, start_date, end_date, gender = -1, older = 0 } = dateInfo;
      const url = URApiConstant.GET_STATISTICS.replace(':type', type)
        .replace(':start_date', start_date)
        .replace(':end_date', end_date)
        .replace(':gender', gender)
        .replace(':older', older);
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
  // getCustomerCountByMonth: async (medical_date) => {
  //   try {
  //     const url = URApiConstant.STATISTICS_COUNT_MONTH.replace(
  //       ':medical_date',
  //       medical_date
  //     );
  //     const apiResult = await $http.get(url);
  //     const { resultCode, resultData, resultMessage } = apiResult;
  //     if (resultCode === SUCCESS_CODE) {
  //       return resultData;
  //     }

  //     throw resultMessage;
  //   } catch (error) {
  //     // console.log(error);
  //     return false;
  //   }
  // },
};
