import React, { useState } from 'react';
import moment from 'moment';
import { MessageAlert, timeConversion, TypeManager } from 'utils/';
import MedicalTable from './components/MedicalTable';
import { FileSearchOutlined } from '@ant-design/icons';
import './medical.css';
import 'moment/locale/ko';
import { CustomerModal } from 'components/layout';
import { useAppDispatch } from 'context/MainContext';
import { SURVEY_CUSTOMER } from 'context/MainReducer';
import { URMedicalApi } from 'api';

const columns = [
  {
    title: 'NO',
    dataIndex: 'medical_id',
    render: (a, b, idx) => {
      return idx + 1;
    },
  },
  {
    title: '이름',
    dataIndex: 'customer_nm',
    render: (customer_nm) => {
      return customer_nm;
    },
  },
  {
    title: '휴대폰번호',
    dataIndex: 'customer_tel',
  },
  {
    title: '상태',
    dataIndex: 'medical_status',
    render: (medical_status) => {
      const { color, value, textDecoration } = TypeManager.getStatusType(
        medical_status
      );
      return <div style={{ color: color, textDecoration }}>{value}</div>;
    },
  },
  {
    title: '접수시간',
    dataIndex: 'created_at',
    render: (created_at) => {
      // return timeConversion(created_at * 1000, 'A hh:mm');
      return timeConversion(created_at * 1000, 'lll');
    },
  },
  {
    title: '대기시간',
    dataIndex: 'completed_at',
    render: (completed_at, row) => {
      const { created_at } = row;
      if (completed_at) {
        // return moment.unix(completed_at - created_at).format('llll');
        return parseInt((completed_at - created_at) / 60) + '분';
      }
      // return moment(created_at * 1000).format('mm') + '분';
      return parseInt(moment(moment() / 1000 - created_at) / 60) + '분';
    },
  },
];

const MedicalPresenter = ({ medicalList, history, getMedicalInfo }) => {
  const dispatch = useAppDispatch();

  const [visible, setVisible] = useState(false);
  const [userInfo, setUserInfo] = useState(false);

  const handleSetUserInfo = (item) => {
    setUserInfo(item);
    setVisible(true);
  };

  const handleChangeStatus = async (type) => {
    const { medical_id } = userInfo;
    const result = await URMedicalApi.updateMedicalStatus({
      medical_status: type,
      medical_id,
    });
    if (result) {
      setUserInfo({ ...userInfo, medical_status: type });
      MessageAlert.success('변경완료');
      await getMedicalInfo();
    } else {
      MessageAlert.error('변경 실패');
    }
  };

  // eslint-disable-next-line
  const handlePreSurvey = () => {
    const { customer_id, medical_id } = userInfo;
    dispatch({ type: SURVEY_CUSTOMER, payload: { medical_id, customer_id } });
    history.push('/t/presurvey');
  };

  // eslint-disable-next-line
  const handleSurvey = () => {
    history.push('/t/survey');
  };

  return (
    <div className="medical-presenter">
      <div className="left-side">
        <FileSearchOutlined className="phone-icon" />
        <div className="phone-title">
          <div className="strong">고객정보</div>진료할 고객을 선택해주세요
        </div>
      </div>
      <div className="right-side">
        <div className="table-wrapper">
          <MedicalTable
            columns={columns}
            list={medicalList}
            onClick={handleSetUserInfo}
          />
        </div>
      </div>
      {userInfo && (
        <CustomerModal
          customer_id={userInfo.customer_id}
          modal={visible}
          setModal={setVisible}
          changeStatus={handleChangeStatus}
          startPresurvey={handlePreSurvey}
          startSurvey={handleSurvey}
          medical_id={userInfo.medical_id}
          medical_status={userInfo.medical_status}
        />
      )}

      {/* <ModalLayout modal={visible} setModal={setVisible} title="사용자 정보">
        <SurveyModal userInfo={userInfo} history={history} />
      </ModalLayout> */}
    </div>
  );
};

export default MedicalPresenter;
