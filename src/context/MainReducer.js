// import { produce } from 'immer';
import { setCookie } from '../utils';
import surveySample from './sample/survey';
export const initialState = {
  platform: 'mobile',
  admin: false,
  member: false,
  company: false,
  assets: false,
  loading: false,
  customer: false,
  medical: [],
  page: {
    path: '/a/dashboard',
    name: '대시보드',
  },
  audioList: '',
  //FIXME 테스트 데이터라서 나중에 지울예정!
  survey: surveySample,
};

export const SET_LOADING = 'SET_LOADING';
export const FETCH_MEDICAL = 'FETCH_MEDICAL';
export const SET_PLATFORM = 'SET_PLATFORM';
export const SIGNUP_CUSTOMER = 'SIGNUP_CUSTOMER';
export const SIGNIN = 'SIGNIN';
export const SESSION = 'SESSION';
export const LOGOUT = 'LOGOUT';
export const MSOCKET = 'MYSOCKET';
export const ADMIN_SIGNIN = `ADMIN_SIGNIN`;
export const ADMIN_SESSION = `ADMIN_SESSION`;
export const ADMIN_PAGE = 'ADMIN_PAGE';

/** SURVEY TYPE */
export const SET_SURVEY = 'SURVEY/SET_SURVEY';
export const ADD_QUESTION = 'SURVEY/ADD_QUESTION';
export const REORDER_QUESTION = 'SURVEY/REORDER_QUESTION';
export const REMOVE_QUESTION = 'SURVEY/REMOVE_QUESTION';
export const UPDATE_QUESTION_TEXT = 'SURVEY/UPDATE_QUESTION_TEXT';
export const ADD_ANSWER = 'SURVEY/ADD_ANSWER';
export const REMOVE_ANSWER = 'SURVEY/REMOVE_ANSWER';
export const UPDATE_ANSWER_TEXT = 'SURVEY/UPDATE_ANSWER_TEXT';
export const SURVEY_CUSTOMER = 'SURVEY/SURVEY_CUSTOMER';

export const PLAY_AUDIO = 'AUDIO/PLAY_AUDIO';
export const SET_AUDIO = 'AUDIO/SET_AUDIO';

export function mainReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_PLATFORM:
      setCookie('platform', payload);
      return { ...state, platform: payload };
    case SIGNIN:
      const { token, member, company, assets } = payload;
      setCookie('token', token);
      setCookie('member', JSON.stringify(member));
      setCookie('company', JSON.stringify(company));
      setCookie('assets', JSON.stringify(assets));
      return { ...state, member, company, assets };
    case SESSION:
      return {
        ...state,
        member: payload.member,
        company: payload.company,
        assets: payload.assets,
      };
    case SIGNUP_CUSTOMER:
      return { ...state, customer: payload };
    case LOGOUT:
      setCookie('token', JSON.stringify(false));
      setCookie('member', JSON.stringify(false));
      setCookie('company', JSON.stringify(false));
      setCookie('assets', JSON.stringify(false));
      setCookie('platform', 'mobile');

      return {
        ...state,
      };
    case ADMIN_PAGE:
      setCookie('page', JSON.stringify(payload));
      return {
        ...state,
        page: payload,
      };
    case ADMIN_SIGNIN:
      const { manager_login_id, manager_pin, manager_nm } = payload;
      setCookie(
        'admin',
        JSON.stringify({ manager_login_id, manager_nm, manager_pin }),
        0.05
      );
      setCookie('token', payload.token, 0.05);
      return { ...state, admin: payload };

    case ADMIN_SESSION:
      return {
        ...state,
        admin: payload,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: payload,
      };

    case SET_SURVEY:
      return { ...state, survey: payload };
    case ADD_QUESTION:
    case REMOVE_QUESTION:
    case REORDER_QUESTION:
    case UPDATE_QUESTION_TEXT:
    case ADD_ANSWER:
    case REMOVE_ANSWER:
    case UPDATE_ANSWER_TEXT:
      // return produce(state, (draftState) => {
      //   draftState.survey[payload.survey_id].survey_questions =
      //     payload.new_survey_questions;
      // });
      return { ...state };

    case SURVEY_CUSTOMER:
      return { ...state, customer: payload };

    case PLAY_AUDIO:
      return { ...state, audioList: payload };
    default:
      throw new Error();
  }
}
