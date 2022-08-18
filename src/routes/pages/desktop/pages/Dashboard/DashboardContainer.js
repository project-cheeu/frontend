import { URDashboardApi, URMedicalApi } from 'api';
import { useAppState } from 'context/MainContext';
import React, { useEffect, useState } from 'react';
import { getCookie, setCookie, TypeManager } from 'utils';
import DashboardPresenter from './DashboardPresenter';
import useSWR from 'swr';
import { ApiManager, base_url } from 'utils';
import { Button, notification } from 'antd';
import moment from 'moment';
import NOTIFICATION from 'assets/alert01.wav';
import useSound from 'use-sound';

const $http = new ApiManager();

const AdminDashBoardContainer = (props) => {
  const [notificationAlert, notificationAlertOption] = useSound(NOTIFICATION, {
    loop: true,
  });
  const [screen, setScreen] = useState(false);
  const [dashboard, setDashboard] = useState();
  const [medicalList, setMedicalList] = useState([]);
  const [medicalDetail, setMedicalDetail] = useState(undefined);
  const [calendar, setCalendar] = useState(undefined);
  const [month, setMonth] = useState();

  const { company } = useAppState();
  const { company_id } = company;

  const fetcher = async (...args) => await $http.get(...args);
  const { data, err } = useSWR(
    `${base_url}/dashboard/company/${company_id}`,
    fetcher,
    !screen && {
      refreshInterval: 3000,
    }
  );

  useEffect(() => {
    setMonth(moment().format('yyyy-MM'));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getDashboard();
    getMedicalStatus();
    return () => {
      notificationAlertOption.stop();
    };
    //eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    getCalendar();
    // eslint-disable-next-line
  }, [screen]);

  const getDashboard = () => {
    if (err || !data) {
      return;
    }
    const { resultData } = data;
    const { dashboardCount } = resultData;
    let total = 0;
    const list = TypeManager.list().map((types) => {
      const { type, value, color } = types;
      const [row] = dashboardCount.filter((item) => {
        const { medical_status } = item;
        return medical_status === type;
      });
      if (row) {
        const { status_count } = row;
        total += status_count;
        return { medical_status: value, status_count, color };
      }
      return { medical_status: value, status_count: 0, color };
    });
    list.push({ medical_status: 'Total', status_count: total });
    setDashboard(list);
  };

  const handleNotificationAlert = () => {
    notificationAlert();
    setTimeout(() => {
      notificationAlertOption.stop();
    }, 5000);
  };

  const getMedicalStatus = async () => {
    if (err || !data) {
      return;
    }
    const { resultData } = data;
    const { medical } = resultData;

    if (medical.length === 0) {
      setCookie('firstAlert', false);
      setMedicalList([]);
      return;
    }
    const temp = getCookie('firstAlert');

    if (
      (temp === 'false' && medical.length > 0) ||
      (medicalList.length !== 0 && medicalList.length !== medical.length)
    ) {
      setCookie('firstAlert', true);
      openNotification('bottomLeft', medical[0]);
      handleNotificationAlert();
    }
    setMedicalList(medical);
  };

  const handleGetMedicalDetail = async (medicalInfo) => {
    const { medical_id } = medicalInfo;
    const result = await URMedicalApi.getMedicalDetail(medical_id);
    if (result) {
      setMedicalDetail(result);
    }
  };

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
      onClose: () => notificationAlertOption.stop(),
      key: key,
      btn: btn,
      closeIcon: null,
    });
  };

  const getCalendar = async () => {
    if (!screen) {
      return;
    }
    let date;
    if (!month) {
      date = moment().format('yyyy-MM');
    } else {
      date = month;
    }
    const result = await URDashboardApi.getDashboardCalendar({
      company_id,
      month: date,
    });
    if (result) {
      setCalendar(result);
    }
  };

  return (
    <DashboardPresenter
      screen={screen}
      setScreen={setScreen}
      medicalList={medicalList}
      getMedicalList={getMedicalStatus}
      getMedicalDetail={handleGetMedicalDetail}
      medicalDetail={medicalDetail}
      setMedicalDetail={setMedicalDetail}
      dashboard={dashboard}
      getMedicalStatus={getMedicalStatus}
      month={month}
      setMonth={setMonth}
      calendar={calendar}
    />
  );
};

export default AdminDashBoardContainer;
