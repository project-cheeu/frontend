import axios from 'axios';
import URApiConstant from './URApiConstant';
import { SUCCESS_CODE } from '../utils';
// eslint-disable-next-line
export default {
  upload: async (file) => {
    try {
      const config = {
        headers: {
          'content-type':
            'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s',
        },
      };

      let apiData = await axios
        .post(URApiConstant.FILE_UPLOAD, file, config)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });

      const { resultCode, resultData, resultMessage } = apiData;
      // console.log(apiData);
      if (resultCode === SUCCESS_CODE) {
        const [thumbnail] = resultData;
        if (thumbnail) {
          return thumbnail;
        }
      }
      throw resultMessage;
    } catch (error) {
      return false;
    }
  },
};
