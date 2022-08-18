import { base_url } from '../utils';
// eslint-disable-next-line
export default {
  //SECTION 0.Auth
  /**
   * @title signin
   * @method POST
   * @description /signin
   * @param { member_login_id, member_login_pw } loginInfo
   */
  SIGNIN: `${base_url}/signin`,

  /**
   * @title managerSignIn
   * @method POST
   * @description /manager/signin
   * @param {manager_login_id, manager_login_pw} loginInfo
   */
  MANAGER_SIGNIN: `${base_url}/signin/manager`,

  /**
   * @title verifyToken
   * @method POST
   * @description /verify
   * @param token
   */
  VERIFY_TOKEN: `${base_url}/verify`,

  //SECTION 1.Company
  /**
   * @title signupCompany
   * @method POST
   * @description /company/signup
   * @param {companyInfo, deptInfo, memberInfo} signupInfo
   */
  SIGNUP_COMPANY: `${base_url}/company/signup`,
  /**
   * @title insertCompany
   * @method POST
   * @description /company
   * @param {company_id,company_nm,company_tel,company_addr,company_mail,company_num,company_regist_num,created_at,modify_at,use_yn} companyInfo
   */
  INSERT_COMPANY: `${base_url}/company`,

  /**
   * @title getCompanyList
   * @method GET
   * @description /company
   * @param {}
   */
  GET_COMPANY_LIST: `${base_url}/company`,

  /**
   * @title getCompanyDetail
   * @method GET
   * @description /company/:company_id
   * @param company_id:string
   */
  GET_COMPAN_DETAIL: `${base_url}/company/:company_id`,

  /**
   * @title updateCompany
   * @method PUT
   * @description /company
   * @param {company_id, company_nm, company_tel, company_addr, company_mail} companyInfo
   */
  UPDATE_COMPANY: `${base_url}/company`,

  /**
   * @title deleteCompany
   * @method DELETE
   * @description /company
   * @param company_id
   */
  DELETE_COMPANY: `${base_url}/company`,

  /**
   * @title registMember
   * @method POST
   * @description /company/member
   * @param { company_id, member_id } memberInfo
   */
  REGIST_MEMBER: `${base_url}/company/member`,

  /**
   * @title unregistMember
   * @method DELETE
   * @description /company/member
   * @param {company_id, member_id} memberInfo
   */
  UNREGIST_MEMBER: `${base_url}/company/member`,

  //SECTION 2.CompanyAssets
  /**
   * @title insertCompanyAssets
   * @method POST
   * @description /assets
   * @param { logo_url, voice_text, title_text,	welcome_text,	visit_text,	revisit_text,	company_id } assetsInfo
   */
  INSERT_COMPANY_ASSETS: `${base_url}/assets`,

  /**
   * @title getCompanyAssetsList
   * @method GET
   * @description /assets
   * @param {}
   */
  GET_COMPANY_ASSETS_LIST: `${base_url}/assets`,

  /**
   * @title getCompanyAssets
   * @method GET
   * @description /assets/:company_id
   * @param company_id
   */
  GET_COMPANY_ASSETS: `${base_url}/assets/:company_id`,

  /**
   * @title updateCompanyAssets
   * @method PUT
   * @description /assets
   * @param {assets_id, logo_url, voice_text, title_text, welcome_text, visit_text, revisit_text, company_id} assetsInfo
   */
  UPDATE_COMPANY_ASSETS: `${base_url}/assets`,

  //SECTION 3.Dept
  /**
   * @title insertDept
   * @method POST
   * @description /dept
   * @param { dept_nm, company_id, dept_manager } deptInfo
   */
  INSERT_DEPT: `${base_url}/dept`,

  /**
   * @title getDeptList
   * @method GET
   * @description /dept/:company_id
   * @param company_id
   */
  GET_DEPT_LIST: `${base_url}/dept/:company_id`,

  /**
   * @title updateDept
   * @method PUT
   * @description /dept
   * @param { dept_nm, company_id, dept_manager, modify_at } deptInfo
   */
  UPDATE_DEPT: `${base_url}/dept`,

  /**
   * @title deleteDept
   * @method DELETE
   * @description /dept
   * @param { company_id, dept_id } deptInfo
   */
  DELETE_DEPT: `${base_url}/dept`,

  /**
   * @title registDeptMember
   * @method POST
   * @description /dept/member
   * @param { company_id, dept_id } memberInfo
   */
  REGIST_DEPT_MEMBER: `${base_url}/dept/member`,

  /**
   * @title updateDeptMember
   * @method PUT
   * @description /dept/member
   * @param { company_id, dept_id } memberInfo
   */
  UPDATE_DEPT_MEMBER: `${base_url}/dept/member`,

  /**
   * @title unregistDeptMember
   * @method DELETE
   * @description /dept/member
   * @param { company_id, dept_id } memberInfo
   */
  UNREGIST_DEPT_MEMBER: `${base_url}/dept/member`,

  //SECTION 4.Member
  /**
   * @title insertMember
   * @method POST
   * @description /member
   * @param {member_login_id, member_login_pw, member_nm, member_div} memberInfo
   */
  INSERT_MEMBER: `${base_url}/member`,

  /**
   * @title getMemberList
   * @method GET
   * @description /member
   * @param {}
   */
  GET_MEMBER_LIST: `${base_url}/member`,

  /**
   * @title getCompanyMemberList
   * @method GET
   * @description /member/:company_id
   * @param company_id
   */
  GET_COMPANY_MEMBER_LIST: `${base_url}/member/:company_id`,

  /**
   * @title getMemberDetail
   * @method GET
   * @description /member/:company_id/:member_id
   * @param { company_id, member_id } memberInfo
   */
  GET_MEMBER_DETAIL: `${base_url}/member/:company_id/:member_id`,

  /**
   * @title updateMember
   * @method PUT
   * @description /member
   * @param { member_id, member_login_id, member_login_pw, member_nm, member_div } memberInfo
   */
  UPDATE_MEMBER: `${base_url}/member`,

  /**
   * @title deleteMember
   * @method DELETE
   * @description /member
   * @param { member_id, member_login_id, member_login_pw } memberInfo
   */
  DELETE_MEMBER: `${base_url}/member`,

  //SECTION 5.Customer
  /**
   * @title insertCustomer
   * @method POST
   * @description /customer
   * @param { customer_nm, customer_tel, customer_addr, customer_num, agree_date, access_platform, member_id } customerInfo
   */
  INSERT_CUSTOMER: `${base_url}/customer`,

  /**
   * @title insertSingleCustomer
   * @method POST
   * @description /customer/single
   * @param { customer_nm, customer_tel, customer_addr, customer_num, agree_date, access_platform, member_id } customerInfo
   */
  INSERT_CUSTOMER_SINGLE: `${base_url}/customer/single`,

  /**
   * @title insertBulkCustomer
   * @method POST
   * @description /customer/bulk
   * @param { customer_nm, customer_tel, customer_addr, customer_num, agree_date, access_platform, member_id } customerInfo
   */
  INSERT_BULK_CUSTOMER: `${base_url}/customer/bulk`,

  /**
   * @title searchCustomer
   * @method POST
   * @description /customer/search
   * @param
   */
  SEARCH_CUSTOMER: `${base_url}/customer/search`,

  /**
   * @title getCustomerListAll
   * @method GET
   * @description /customer
   * @param
   */
  GET_CUSTOMER_LIST_ALL: `${base_url}/customer`,

  /**
   * @title getCustomerCompany
   * @method GET
   * @description /customer/:company_id
   * @param company_id
   */
  GET_CUSTOMER_COMPANY: `${base_url}/customer/:company_id`,

  /**
   * @title getCustomerDetail
   * @method GET
   * @description /customer/:company_id/:customer_id
   * @param { company_id, customer_id } customerInfo
   */
  GET_CUSTOMER_DETAIL: `${base_url}/customer/:company/:customer_id`,

  /**
   * @title getCustomerMedical
   * @method GET
   * @description /customer/medical/:customer_id
   * @param { customer_id } customerInfo
   */
  GET_CUSTOMER_MEDICAL: `${base_url}/customer/medical/:customer_id`,

  /**
   * @title updateCustomer
   * @method PUT
   * @description /customer
   * @param { customer_id, customer_nm, customer_tel, customer_addr, member_id } customerInfo
   */
  UPDATE_CUSTOMER: `${base_url}/customer`,

  /**
   * @title deleteCustomer
   * @method DELETE
   * @description /customer
   * @param { customer_id,customer_num } customerInfo
   */
  DELETE_CUSTOMER: `${base_url}/customer`,

  /**
   * @title insertCustomerDetail
   * @method POST
   * @description /customer/detail
   * @param { customer_id, visiting_path, medical_history, customer_insurance } customerDetail
   */
  INSERT_CUSTOMER_DETAIL: `${base_url}/customer/detail`,

  //SECTION 6.Medical
  //FIXME
  /**
   * @title insertMeidicalInfo
   * @method POST
   * @description /medical
   * @param {} medicalInfo
   */
  INSERT_MEIDICAL_INFO: `${base_url}/medical`,

  /**
   * @title getMedicalListAll
   * @method GET
   * @description /medical
   * @param {}
   */
  GET_MEDICAL_LIST_ALL: `${base_url}/medical`,

  /**
   * @title getMedicalList
   * @method GET
   * @description /medical/:company_id/:type
   * @param { company_id, type } params
   */
  GET_MEDICAL_LIST: `${base_url}/medical/:company_id/:type`,

  /**
   * @title getMedicalDetail
   * @method GET
   * @description /medical/detail/:medical_id
   * @param { medical_id } params
   */
  GET_MEDICAL_DETAIL: `${base_url}/medical/detail/:medical_id`,

  /**
   * @title updateMedical
   * @method PUT
   * @description /medi cal
   * @param {  medical_id, medical_status, completed_at, medical_subject, } body
   */
  UPDATE_MEIDCAL: `${base_url}/medical`,

  /**
   * @title getMedicalSubjectList
   * @method GET
   * @description /subject
   * @param {}
   */
  GET_MEDICAL_SUBJECT_LIST: `${base_url}/subject`,

  /**
   * @title insertMedicalSubject
   * @method POST
   * @description /subject
   * @param {} body
   */
  INSERT_MEDICAL_SUBJECT: `${base_url}/subject`,

  /**
   * @title searchMedicalSubject
   * @method GET
   * @description /subject/:keyword
   * @param { keyword } params
   */
  SEARCH_MEDICAL_SUBJECT: `${base_url}/subject/:keyword`,

  /**
   * @title updateMedicalSubject
   * @method PUT
   * @description /subject
   * @param {  }
   */
  UPDATE_MEDICAL_SUBJECT: `${base_url}/subject`,

  /**
   * @title deleteMedicalSubject
   * @method DELETE
   * @description /subject
   * @param {} body
   */
  DELETE_MEDICAL_SUBJECT: `${base_url}/subject`,

  /**
   * @title getReservationListAll
   * @method GET
   * @description /reservation/all
   */
  GET_RESERVATION_LIST_ALL: `${base_url}/reservation/all`,
  /**
   * @title getReservationCompany
   * @method GET
   * @description /reservation/company/:company_id
   * @param {String} company_id
   */
  GET_RESERVATION_COMPANY: `${base_url}/reservation/company/:company_id`,
  /**
   * @title getReservationCustomer
   * @method GET
   * @description /reservation/customer/:customer_id
   * @param {String} customer_id
   */
  GET_RESERVATION_CUSTOMER: `${base_url}/reservation/customer/:customer_id`,
  /**
   * @title updateReservation
   * @method PUT
   * @description /reservation
   * @param {} body
   */
  UPDATE_RESERVATION: `${base_url}/reservation`,
  /**
   * @title cancelReservation
   * @method PUT
   * @description /reservation/cancel
   * @param {} body
   */
  CANCLE_RESERVATION: `${base_url}/reservation/cancel`,
  /**
   * @title doneReservation
   * @method PUT
   * @description /reservation/done
   * @param {} body
   */
  DONE_RESERVATION: `${base_url}/reservation/done`,

  /**
   * @title insertReservationInfo
   * @method POST
   * @description /reservation/info
   * @param {} body
   */
  INSERT_RESERVATION_INFO: `${base_url}/reservation/info`,
  /**
   * @title getReservationInfoAll
   * @method GET
   * @description /reservation/info/all
   * @param {} body
   */
  GET_RESERVATION_INFO_ALL: `${base_url}/reservation/info/all`,
  /**
   * @title getReservationInfo
   * @method GET
   * @description /reservation/info/:company_id
   * @param {} body
   */
  GET_RESERVATION_INFO: `${base_url}/reservation/info/:company_id`,
  /**
   * @title updateReservationInfo
   * @method PUT
   * @description /reservation/info
   * @param {} body
   */
  UPDATE_RESERVATION_INFO: `${base_url}/reservation/info`,
  /**
   * @title deleteReservationInfo
   * @method DELETE
   * @description /reservation/info
   * @param {} body
   */
  DELETE_RESERVATION_INFO: `${base_url}/reservation/info`,

  //SECTION 7.Survey

  //SECTION 8.Manager

  /**
   * @title checkManager
   * @method GET
   * @description /manager/check
   * @param {}
   */
  CHECK_MANAGER: `${base_url}/manager/check`,

  /**
   * @title insertManager
   * @method POST
   * @description /manager
   * @param { manager_login_id, manager_login_pw, manager_am, created_at } managerInfo
   */
  INSERT_MANAGER: `${base_url}/manager`,

  /**
   * @title getManagerList
   * @method GET
   * @description /manager
   * @param {}
   */
  GET_MANAGER_LIST: `${base_url}/manager`,

  /**
   * @title updateManager
   * @method PUT
   * @description /manager
   * @param { manager_id, manager_login_id, manager_login_pw, manager_am } managerInfo
   */
  UPDATE_MANAGER: `${base_url}/manager`,

  /**
   * @title deleteManager
   * @method DELETE
   * @description /manager
   * @param { manager_id } managerInfo
   */
  DELETE_MANAGER: `${base_url}/manager`,

  //SECTION 9.
  //
  FILE_UPLOAD: `${base_url}/upload`,

  //SECTION 9. Survey
  GET_SURVEY: `${base_url}/survey/:company_id`,
  INSERT_SURVEY: `${base_url}/survey`,
  PUT_SURVEY: `${base_url}/survey`,
  DELETE_SURVEY: `${base_url}/survey`,

  //SECTION 10. Survey Question
  GET_SURVEY_QUESTION: `${base_url}/survey/questions`,
  INSERT_SURVEY_QUESTION: `${base_url}/survey/questions`,
  PUT_SURVEY_QUESTION: `${base_url}/survey/questions`,
  DELETE_SURVEY_QUESTION: `${base_url}/survey/questions`,
  TOGGLE_QUESTION: `${base_url}/survey/questions/toggle`,

  //SECTION 11. Survey Reply
  GET_SURVEY_REPLY: `${base_url}/survey/reply`,
  INSERT_SURVEY_REPLY: `${base_url}/survey/reply`,
  PUT_SURVEY_REPLY: `${base_url}/survey/reply`,
  DELETE_SURVEY_REPLY: `${base_url}/survey/reply`,

  //SECTION 12. Survey Answer
  GET_SURVEY_ANSWER_LIST_ALL: `${base_url}/survey/answer/:customer_id`,
  GET_SURVEY_ANSWER_LIST: `${base_url}/survey/answer/:customer_id/:company_id`,
  GET_SURVEY_ANSWER: `${base_url}/survey/answer/:customer_id/:company_id/:medical_id`,
  INSERT_SURVEY_ANSWER: `${base_url}/survey/answer`,

  //SECTION 13. Dashboard
  GET_DASHBOARD_ADMIN: `${base_url}/dashboard`,
  GET_DASHBOARD: `${base_url}/dashboard/company/:company_id`,
  GET_DASHBOARD_CALENDAR: `${base_url}/dashboard/calendar/:company_id/:month`,

  //SECTION 14. Statistics
  GET_STATISTICS: `${base_url}/statistics/customer/:type/:start_date/:end_date/:gender/:older`,

  //SECTION 15. Alimtalk
  GET_ALIMTALK_LIST: `${base_url}/alimtalk`,
  GET_ALIMTALK: `${base_url}/alimtalk/:company_id`,

  //SECTION 16. Agreement
  GET_AGREEMENT_FORM_LIST: `${base_url}/agreement/form/:company_id`,
  INSERT_AGREEMENT_FORM: `${base_url}/agreement/form`,
  UPDATE_AGREEMENT_FORM: `${base_url}/agreement/form`,
  INSERT_USER_AGREEMENT: `${base_url}/agreement`,
  GET_USER_AGREEMENT: `${base_url}/agreement/:company_id/:customer_id`,
  DELETE_AGREEMENT_FORM: `${base_url}/agreement/form`,

  //SECTION 17. CompanySchedule
  INSERT_SCHEDULE: `${base_url}/schedule`,
  INSERT_SCHEDULE_BULK: `${base_url}/schedule`,
  GET_SCHEDULE_COMPANY: `${base_url}/schedule/company/:company_id`,
  GET_SCHEDULE_CUSTOMER: `${base_url}/schedule/customer/:customer_id`,
  EMERGENCY_STOP: `${base_url}/schedule/emergency`,
  RECOVER_STOP: `${base_url}/schedule/recovery`,
  UPDATE_SCHEDULE_COMPNAY: `${base_url}/schedule`,
  DELETE_SCHEDULE_COMPANY: `${base_url}/schedule`,

  SEARCH_CUSTOMER_DUMP: `${base_url}/dump/search/:company_id/:customer_tel`,
  GET_CUSTOMER_DUMP: `${base_url}/dump/:company_id`,

  //SECTION 18.DID Notice
  INSERT_NOTICE: `${base_url}/notice`,
  GET_NOTICE_LIST: `${base_url}/notice/:company_id`,
  UPDATE_NOTICE: `${base_url}/notice`,
  DELETE_NOTICE: `${base_url}/notice`,

  //SECTION 19. DID Video
  INSERT_VIDEO: `${base_url}/video`,
  GET_VIDEO_LIST: `${base_url}/video/:company_id`,
  UPDATE_VIDEO: `${base_url}/video`,
  DELETE_VIDEO: `${base_url}/video`,
};
