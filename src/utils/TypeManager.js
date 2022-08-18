const statusType = [
  {
    type: 'RESERVATION',
    value: '예약요청',
    color: '#000000',
    borderColor: '#000000',
    backgroundColor: '#000000',
  },
  {
    type: 'RESERVATION_ACEPTING',
    value: '예약확인',
    color: '#058aff',
    borderColor: '#000000',
    backgroundColor: '#000000',
  },
  {
    type: 'RESERVATION_CANCEL',
    value: '예약취소',
    color: '#000000',
    borderColor: '#000000',
    backgroundColor: '#000000',
    textDecoration: 'line-through',
  },
  {
    type: 'APPLICATION_COMPLETE',
    value: '접수완료',
    color: '#ff0015',
    borderColor: '#ff0015',
    backgroundColor: '#ff0015',
  },
  {
    type: 'SURVEY',
    value: '문진,설문중',
    color: '#ff8000',
    borderColor: '#ff8000',
    backgroundColor: '#ff8000',
  },
  {
    type: 'TREATMENT',
    value: '진료중',
    color: '#ff8000',
    borderColor: '#ff8000',
    backgroundColor: '#ff8000',
  },
  {
    type: 'CONSULTING',
    value: '상담중',
    color: '#ff8000',
    borderColor: '#ff8000',
    backgroundColor: '#ff8000',
  },
  {
    type: 'DONE',
    value: '진료완료',
    color: '#000000',
    borderColor: '#adadad',
    backgroundColor: '#adadad',
  },

  {
    type: 'RECEIVE',
    value: '수납완료',
    color: '#adadad',
    borderColor: '#adadad',
    backgroundColor: '#adadad',
  },
];

const surveyType = [
  {
    type: 'PRE_SURVEY',
    value: '문진설문',
    color: '#adadad',
    borderColor: '#adadad',
    backgroundColor: '#adadad',
  },
  {
    type: 'SURVEY',
    value: '만족도/설문',
    color: '#adadad',
    borderColor: '#adadad',
    backgroundColor: '#adadad',
  },
];

const memberDiv = [
  {
    type: 'ADMIN',
    value: '관리자',
    color: '#adadad',
    borderColor: '#adadad',
    backgroundColor: '#adadad',
  },
  {
    type: 'READ',
    value: '사원',
    color: '#adadad',
    borderColor: '#adadad',
    backgroundColor: '#adadad',
  },
  {
    type: 'WRITE',
    value: '매니저',
    color: '#adadad',
    borderColor: '#adadad',
    backgroundColor: '#adadad',
  },
];

const TypeManager = {
  getStatusType: (type) => {
    const idx = statusType.findIndex((item) => {
      return item.type === type;
    });
    return statusType[idx];
  },
  list: () => statusType,
  getSurveyType: (type) => {
    const idx = surveyType.findIndex((item) => {
      return item.type === type;
    });
    return surveyType[idx];
  },
  memberDivList: () => memberDiv,
  getMemberDiv: (type) => {
    const idx = memberDiv.findIndex((item) => {
      return item.type === type;
    });
    return memberDiv[idx];
  },
};

export default TypeManager;

//  //주민등록 번호 13자리를 검사한다.
//  var fmt = /^\d{6}[1234]\d{6}$/;  //포멧 설정
//  if (!fmt.test(jumin)) {
//   return false;
//  }

//  // 생년월일 검사
//  var birthYear = (jumin.charAt(6) <= "2") ? "19" : "20";
//  birthYear += jumin.substr(0, 2);
//  var birthMonth = jumin.substr(2, 2) - 1;
//  var birthDate = jumin.substr(4, 2);
//  var birth = new Date(birthYear, birthMonth, birthDate);

//  if ( birth.getYear() % 100 != jumin.substr(0, 2) ||
//       birth.getMonth() != birthMonth ||
//       birth.getDate() != birthDate) {
//     return false;
//  }

//  // Check Sum 코드의 유효성 검사
//  var buf = new Array(13);
//  for (var i = 0; i < 13; i++) buf[i] = parseInt(jumin.charAt(i));

//  multipliers = [2,3,4,5,6,7,8,9,2,3,4,5];
//  for (var sum = 0, i = 0; i < 12; i++) sum += (buf[i] *= multipliers[i]);

//  if ((11 - (sum % 11)) % 10 != buf[12]) {
//     return false;
//  }

//  return true;
// }
