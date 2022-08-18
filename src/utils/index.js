// env 설정
import GLOBAL from './config/global';
import moment from 'moment';
import 'moment/locale/ko';

const deployType = process.env.REACT_APP_DEPLOY_TYPE
  ? process.env.REACT_APP_DEPLOY_TYPE
  : process.env.NODE_ENV;

export const envType = deployType;

// API URL
export const base_url = GLOBAL[deployType]['base_url'];
export const bucket_url = GLOBAL[deployType]['bucket_url'];
export const kakao_key = GLOBAL[deployType]['kakao_key'];
export const domain_url = GLOBAL[deployType]['domain_url'];
export const did_url = GLOBAL[deployType]['DID_URL'];

// ApiManager, fetch메서드 사용.
export { default as ApiManager } from './ApiManager';

// API Status Code
export const SUCCESS_CODE = 200;
export const FAILURE_CODE = 400;

// Antd MessageAlert
export { default as MessageAlert } from './MessageAlert';

// Antd Notification
export { default as Notification } from './Notification';

// TypeManager
export { default as TypeManager } from './TypeManager';

// mobile
export const mobile =
  window.innerWidth < 1400 && window.innerWidth > 949 ? true : false;

// getCookie
export const getCookie = (name, options = null) => {
  const value = window.document.cookie.match(
    '(^|;) ?' + name + '=([^;]*)(;|$)'
  );
  return value ? value[2] : null;
};

// setCookie
export const setCookie = (name, value, expires = 1, callback = false) => {
  var date = new Date();
  date.setTime(date.getTime() + expires * 1000 * 60 * 60 * 24);
  window.document.cookie = `${name}=${value};expires=${date.toUTCString()}; path=/`;
  if (callback) callback();
};

// clearCookie
export const deleteCookie = (name, { path, domain }) => {
  if (getCookie(name)) {
    window.document.cookie =
      name +
      '=' +
      (path ? ';path=' + path : '') +
      (domain ? ';domain=' + domain : '') +
      ';expires=Thu, 01 Jan 1970 00:00:01 GMT';
  }
};

export const rrn = (num = '') => {
  return num.replace(/(-?)([1-4]{1})([0-9]{6})\b/, '$1$2******');
};

export const timeConversion = (time, format) => {
  return moment(time).format(format);
};

/**
 * 금액 포맷터
 * --
 * @param {*} v
 * @param {*} unit
 * @returns
 */
export const stringToMoneyFormat = (v = 0, unit = '') => {
  // const value = String(isNull(v) ? 0 : v)
  const value = String(v ? v : 0)
    .split('')
    .reverse()
    .join('');
  const valueLength = value.length;
  let result = '';
  for (let ii in value) {
    result += String(value[ii]);
    if ((ii + 1) % 3 === 0 && ii < valueLength - 1) {
      result += ',';
    }
  }
  return `${result.split('').reverse().join('')}${unit}`;
};
