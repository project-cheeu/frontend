import { Card, Col, Row } from 'antd';
import React, { useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DashboardCard } from 'components';
const DashboardCalander = (props) => {
  const calendarRef = useRef(null);

  useEffect(() => {
    const initCalendar = () => {
      // eslint-disable-next-line
      const calendar = calendarRef.current;
      // calendarRef.current;
    };
    initCalendar();
  }, []);
  return (
    <>
      <Row gutter={[10, 10]}>
        {/* 1열 예약 및 문의 건수 조회 열 */}
        <Col span={6}>
          <Card title={'병원'}>
            <DashboardCard text={1 + '건'} />
          </Card>
        </Col>
        <Col span={6}>
          <Card title={'방문자'}>
            <DashboardCard text={'35,000건'} />
          </Card>
        </Col>
        <Col span={6}>
          <Card title={'문진'}>
            <DashboardCard text={'33,400건'} />
          </Card>
        </Col>
        <Col span={6}>
          <Card title={'설문'}>
            <DashboardCard text={'1,500건'} />
          </Card>
        </Col>
        {/* REVIEW */}

        {/* 2열 일정 달력 및 예약 현황 알림 열 */}
        <Col span={24}>
          <Card>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              timeZone={'KST'}
              ref={calendarRef}
              initialView="dayGridMonth"
              locale="ko"
              height={700}
              headerToolbar={false}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashboardCalander;
