/* eslint-disable */
import { URCompanyScheduleApi, URReservationApi } from 'api';
import { useAppDispatch, useAppState } from 'context/MainContext';
import { SET_LOADING } from 'context/MainReducer';
import React, { useEffect, useState } from 'react';
import { MessageAlert } from 'utils';
import ReservationPresenter from './ReservationPresenter';

const ReservationContainer = (props) => {
  const dispatch = useAppDispatch();
  /* Router */
  /* State */
  const { company } = useAppState();
  const { company_id } = company;
  const [reservationInfo, setReservationInfo] = useState(undefined);
  const [reservationList, setReservationList] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);

  /* Hooks */
  useEffect(() => {
    handleReservationList();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    handleScheduleList();
  }, []);

  /* Functions */
  /**
   * @title handleReservationList
   * @description 예약 리스트 조회
   * @returns
   */
  const handleReservationList = async () => {
    const { company_id } = company;
    const result = await URReservationApi.getReservationListCompany(company_id);
    if (result) {
      setReservationList(result);
      return true;
    }
    setReservationList([]);
  };

  const handleInsertSchedule = async (scheduleInfo) => {
    const result = await URCompanyScheduleApi.insertSchedule(scheduleInfo);
    if (result) {
      MessageAlert.success('예약 정보 등록이 완료되었습니다.');
      await handleReservationList();
      await handleScheduleList();
      return true;
    }
    MessageAlert.error('예약 일정 등록에 실패했습니다.');
    return false;
  };

  const handleScheduleList = async () => {
    const result = await URCompanyScheduleApi.getScheduleCompany(company_id);
    await dispatch({ type: SET_LOADING, payload: true });
    if (result) {
      const temp = result.map((item) => {
        const {
          schedule_date,
          schedule_time,
          schedule_number,
          reservation_count,
        } = item;
        return {
          ...item,
          date: schedule_date,
          title: `${schedule_time} ${reservation_count}/${schedule_number}`,
        };
      });
      setScheduleList(temp);
      await dispatch({ type: SET_LOADING, payload: false });
      return true;
    }
    await dispatch({ type: SET_LOADING, payload: false });
    return false;
  };

  /**
   * 긴급정지요청
   * --
   * @param {Object} scheduleInfo
   */
  const emergencyStop = async (scheduleInfo) => {
    const result = await URCompanyScheduleApi.emergencyStop(scheduleInfo);
    if (result) {
      MessageAlert.success('긴급 정지 완료');
      await handleScheduleList();
      return true;
    }
    MessageAlert.error('긴급 정지 실패');
    return false;
  };

  /**
   * 긴급 정지 복구 요청
   * --
   * @param {Object} scheduleInfo
   * @returns
   */
  const recoveryStop = async (scheduleInfo) => {
    const result = await URCompanyScheduleApi.recoveryStop(scheduleInfo);
    if (result) {
      MessageAlert.success('긴급 정지 복구 완료');
      await handleScheduleList();
      return true;
    }
    MessageAlert.error('긴급 정지 복구 실패');
    return false;
  };

  /* Render */
  return (
    <ReservationPresenter
      reservationInfo={reservationInfo}
      reservationList={reservationList}
      scheduleList={scheduleList}
      insertSchedule={handleInsertSchedule}
      emergencyStop={emergencyStop}
      recoveryStop={recoveryStop}
    />
  );
};

export default ReservationContainer;
