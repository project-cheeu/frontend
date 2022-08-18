import React, { useState } from 'react';
import { Button, Divider, DatePicker, Select } from 'antd';
import { AdminGrid } from 'components';
import './reservation.css';
import moment from 'moment';
import { useAppState } from 'context/MainContext';
import { ReservationCalendar } from './components';
import { MessageAlert } from 'utils';

const { RangePicker } = DatePicker;
const MAX_SIZE = [...new Array(48)];

const list = MAX_SIZE.map((item, i) => {
  var hour = '';

  var min = ':00';

  if (Math.ceil(i / 2) < 13) {
    hour = Math.floor(i / 2);
  } else {
    hour = Math.floor(i / 2);
  }

  hour = Math.floor(i / 2);

  if (hour < 10) {
    hour = '0' + hour;
  }

  if (i % 2 !== 0) {
    min = ':30';
  }
  return {
    time: `${hour}${min}`,
    disable: hour >= '00' && hour < '08' ? 1 : hour >= '18' ? 1 : 0,
  };
});

const ReservationPresenter = ({
  reservationInfo,
  scheduleList,
  reservationList,
  insertSchedule,
  emergencyStop,
  recoveryStop,
}) => {
  /* Router */
  /* State */
  const [timeList, setTimeList] = useState(list);
  const [schedule_date, setSchedule_date] = useState(undefined);
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [day, setDay] = useState('0');
  const [scheduleNumber, setScheduleNumber] = useState(0);
  const { company } = useAppState();
  const { company_id } = company;

  /* Hooks */
  /* Functions */
  const handleTimeToggle = (time) => {
    const temp = timeList.map((item) => {
      const { disable, time: _time } = item;
      if (time === _time) {
        return { ...item, disable: !disable };
      }
      return item;
    });
    setTimeList(temp);
  };

  const handleReset = () => {
    setTimeList(list);
    setDay('0');
    setSchedule_date(undefined);
    setStartDate(undefined);
    setEndDate(undefined);
    setScheduleNumber(0);
  };

  const handleSetDay = (val) => {
    if (val === '0') {
      return;
    }
    setDay(val);
  };

  const handleScheduleNumber = (type) => {
    if (scheduleNumber + type <= 0 || scheduleNumber + type >= 4) {
      return;
    }
    setScheduleNumber(scheduleNumber + type);
  };

  const handleScheduleDate = (e) => {
    const [start, end] = e;
    setSchedule_date(e);
    setStartDate(moment(start).format('yyyy-MM-DD'));
    setEndDate(moment(end).format('yyyy-MM-DD'));
  };

  const handleInsertSchedule = async () => {
    if (!startDate || !endDate || day === '0' || scheduleNumber === 0) {
      MessageAlert.error('기간과 요일, 인원을 지정해주세요.');
      return;
    }
    const temp = timeList.filter((item) => {
      const { disable } = item;
      return !disable;
    });
    const arr = [
      ...new Array(
        moment.duration(moment(endDate).diff(startDate)).asDays() + 1
      ),
    ];
    const _schedule = arr
      .map((item, idx) => {
        const _schedule_date = moment(startDate).add(idx, 'days');
        console.log(moment(_schedule_date).format('dd') === day);
        if (moment(_schedule_date).format('dd') === day) {
          return { schedule_date: moment(_schedule_date).format('yyyy-MM-DD') };
        }
        return false;
      })
      .filter((item) => item);
    let scheduleInfo = [];
    // eslint-disable-next-line
    temp.map((item) => {
      const { time } = item;
      // eslint-disable-next-line
      _schedule.map((_item) => {
        const { schedule_date } = _item;
        scheduleInfo.push({
          schedule_date,
          schedule_time: time,
          scheduleNumber,
          company_id,
        });
        return false;
      });
    });

    await insertSchedule({ company_schedules: scheduleInfo });
  };

  /* Render */
  return (
    <AdminGrid>
      <div className="reservation-container">
        <div className="headline">
          예약 일정 관리
          <Divider />
        </div>
        <div className="treatment-day">
          <div className="day-card">
            <div className="duration">
              <div className="date-picker">
                기간 지정
                <Divider type="vertical" />
                <RangePicker
                  value={schedule_date}
                  onChange={handleScheduleDate}
                />
              </div>
              <div className="reset">
                <Button onClick={handleReset}>초기화</Button>
              </div>
            </div>
            <div className="day-text">
              요일 지정
              <Divider type="vertical" />
              <Select value={day} onChange={handleSetDay} defaultValue="0">
                <option value="0">요일</option>
                <option value="월">월</option>
                <option value="화">화</option>
                <option value="수">수</option>
                <option value="목">목</option>
                <option value="금">금</option>
                <option value="토">토</option>
                <option value="일">일</option>
              </Select>
            </div>
            <div className="schedule-number">
              인원 지정
              <Divider type="vertical" />
              <Button onClick={() => handleScheduleNumber(-1)}>-</Button>
              <Button aria-readonly>{scheduleNumber}</Button>
              <Button onClick={() => handleScheduleNumber(1)}>+</Button>
            </div>
            <div className="time-list">
              {timeList.map((item) => {
                const { time, disable } = item;
                return (
                  <Button
                    size="large"
                    type={disable && 'dashed'}
                    danger={disable}
                    onClick={() => handleTimeToggle(time)}
                    style={{
                      width: '15%',
                      border: !disable && '1px solid black',
                    }}
                  >
                    {time}
                  </Button>
                );
              })}
            </div>
            <Divider />
            <div className="btn-group">
              <Button
                size="large"
                className="apply"
                onClick={handleInsertSchedule}
              >
                적용
              </Button>
            </div>
          </div>
        </div>
        <ReservationCalendar
          scheduleList={scheduleList}
          emergencyStop={emergencyStop}
          recoveryStop={recoveryStop}
        />

        <div>
          <h1>예약 조회</h1>
          <div>{JSON.stringify(reservationList)}</div>
        </div>
      </div>
    </AdminGrid>
  );
};

export default ReservationPresenter;
