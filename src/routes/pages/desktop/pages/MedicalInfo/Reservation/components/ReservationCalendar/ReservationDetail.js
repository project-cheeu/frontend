/* eslint-disable */
import { Button, Divider } from 'antd';
import React, { useState } from 'react';
import './reservation-calendar.css';

const ReservationDetail = ({ reservationDetail, scheduleList }) => {
  /* Router */
  /* State */
  const [schedule, setSchedule] = useState([]);
  const {
    schedule_date,
    schedule_time,
    schedule_number,
    reservation_count,
    reservation,
    medical_reservation,
  } = reservationDetail;
  /* Hooks */
  /* Functions */
  /* Render */
  return (
    <div className="reservation-detail-container">
      <div className="schedule-item">
        <h3>
          예약일:{' '}
          {reservation ? (
            <Button aria-readonly className="btn-green">
              예약 가능
            </Button>
          ) : (
            <Button aria-readonly danger>
              예약 불가
            </Button>
          )}{' '}
        </h3>
        <div className="schedule-info">{schedule_date}</div>
      </div>
      <div className="schedule-item">
        <h3>예약 시간: </h3>
        <div className="schedule-info">{schedule_time}</div>
      </div>
      <div className="schedule-item">
        <h3>예약현황: </h3>
        <div className="schedule-info">
          {reservation_count} / {schedule_number}
        </div>
      </div>
      <Divider />
      <div className="schedule-item"></div>
    </div>
  );
};

export default ReservationDetail;
