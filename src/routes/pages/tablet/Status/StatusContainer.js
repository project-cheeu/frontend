import { useEffect, useState } from 'react';
import { URCustomerApi } from 'api';
import { useAppDispatch, useAppState } from 'context//MainContext';
import StatusPresenter from './StatusPresenter';
import useSWR from 'swr';
import { Button, notification } from 'antd';
import moment from 'moment';
import { ApiManager, base_url } from 'utils';
import { PLAY_AUDIO } from 'context/MainReducer';
const $http = new ApiManager();
/**
 * @title Admin 컨테이너
 * @description 관리자 화면 페이지 컨테이너
 */
const StatusContainer = () => {
  const { company } = useAppState();
  const dispatch = useAppDispatch();
  const { company_id } = company;

  const [medicalList, setMedicalList] = useState([]);
  const [customer, setCustomer] = useState(undefined);

  const fetcher = async (...args) => await $http.get(...args);
  const { data, err } = useSWR(`${base_url}/medical/${company_id}/1`, fetcher, {
    refreshInterval: 3000,
  });

  const openNotification = (placement, content) => {
    const { customer_nm, created_at } = content;
    const submitDate = moment(created_at * 1000).format('LT');
    const key = `open${Date.now()}`;
    const btn = (
      <Button
        danger
        onClick={() => {
          notification.close(key);
        }}
      >
        닫기
      </Button>
    );
    notification.success({
      message: `새로운 접수 알림`,
      description: `${customer_nm}님이 ${submitDate}에 접수되셨습니다.`,
      placement,
      duration: 0,
      onClose: () => dispatch({ type: PLAY_AUDIO, payload: '' }),
      btn: btn,
      key: key,
      closeIcon: null,
    });
  };

  useEffect(() => {
    getMedicalStatus();
    // eslint-disable-next-line
  }, [data]);

  const handleNotificationAlert = () => {
    dispatch({ type: PLAY_AUDIO, payload: 'notificationAlert' });
    setTimeout(() => {
      dispatch({ type: PLAY_AUDIO, payload: '' });
    }, 5000);
  };

  const getMedicalStatus = async () => {
    if (err || !data) {
      return;
    }

    // const result = await URMedicalApi.getMedicalStatus(company_id);
    // setMedicalList(result);
    const { resultData } = data;
    if (medicalList.length !== 0 && medicalList.length !== resultData.length) {
      // MessageAlert.warning('새로 접수되었습니다.');
      openNotification('bottomLeft', resultData[0]);
      handleNotificationAlert();
    }
    setMedicalList(resultData);
  };

  const getCustomerDetail = async (item) => {
    const { customer_id, medical_id, medical_status } = item;

    const customer_detail = {
      company_id,
      customer_id,
    };
    const result = await URCustomerApi.getCustomerDetail(customer_detail);
    setCustomer({ ...result, medical_id, medical_status });
  };

  return data ? (
    <StatusPresenter
      medicalList={medicalList}
      customer={customer}
      setCustomer={setCustomer}
      getCustomerDetail={getCustomerDetail}
      getMedicalInfo={getMedicalStatus}
    />
  ) : (
    ''
  );
};

export default StatusContainer;
