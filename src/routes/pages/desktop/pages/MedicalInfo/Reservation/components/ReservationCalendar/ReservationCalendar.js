import React, { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './reservation-calendar.css';
import { Button, Drawer } from 'antd';
import ReservationDetail from './ReservationDetail';

const ReservationCalendar = ({ scheduleList, emergencyStop, recoveryStop }) => {
  const calendarRef = useRef(null);

  /* Router */
  /* State */
  const initialState = {
    company_id: '',
    medical_reservation: {},
    reservation: true,
    reservation_count: 0,
    schedule_date: '',
    schedule_number: 3,
    schedule_time: '',
    shutdown: false,
  };
  const [scheduleDetail, setScheduleDetail] = useState(initialState);
  const [toggle, setToggle] = useState(false);
  /* Hooks */
  /* Functions */

  const handleScheduleDetail = (obj) => {
    setScheduleDetail(obj);
    setToggle(true);
  };

  const closeScheduleDetail = () => {
    setToggle(false);
    setScheduleDetail(initialState);
  };

  const handleEmergencyStop = async () => {
    const { shutdown } = scheduleDetail;
    if (shutdown) {
      await recoveryStop(scheduleDetail);
    } else {
      await emergencyStop(scheduleDetail);
    }
    closeScheduleDetail();
  };

  /* Render */
  return (
    <div className="reservation-calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        timeZone={'KST'}
        date
        eventClick={(e) => {
          handleScheduleDetail(e.event._def.extendedProps);
        }}
        headerToolbar={false}
        ref={calendarRef}
        initialView="dayGridMonth"
        locale="ko"
        height={'auto'}
        events={scheduleList}
      />
      <Drawer
        title={
          <div>
            예약 정보 확인{' '}
            <Button danger onClick={handleEmergencyStop}>
              {scheduleDetail.shutdown ? '긴급정지 복구' : '긴급 정지'}
            </Button>
          </div>
        }
        placement="right"
        visible={toggle}
        width="500"
        onClose={closeScheduleDetail}
      >
        <ReservationDetail
          reservationDetail={scheduleDetail}
          scheduleList={scheduleList}
        />
      </Drawer>
    </div>
  );
};

export default ReservationCalendar;
