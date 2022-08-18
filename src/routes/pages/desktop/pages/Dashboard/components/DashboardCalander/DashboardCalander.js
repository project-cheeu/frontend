import { Button, Card, Col, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DashboardCard } from 'components';
import { MessageAlert, stringToMoneyFormat } from 'utils';
import moment from 'moment';
import { CustomerModal } from 'components/layout';
import { URMedicalApi } from 'api';
const DashboardCalander = ({
  month,
  setMonth,
  calendar,
  medicalDetail,
  setMedicalDetail,
  getMedicalDetail,
  getMedicalStatus,
}) => {
  const calendarRef = useRef(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const initCalendar = () => {
      // eslint-disable-next-line
      // const calendar = calendarRef.current;
      const calendarApi = calendarRef.current.getApi();
      if (month) {
        calendarApi.gotoDate(month);
        calendarApi.select(month);
      }
      // calendarRef.current;
    };
    initCalendar();
  }, [month]);

  useEffect(() => {}, []);

  const handleMonth = (type) => {
    let date;
    if (type) {
      date = moment(month).add(1, 'M');
    } else {
      date = moment(month).subtract(1, 'M');
    }
    console.log(date);
    setMonth(moment(date).format('yyyy-MM'));
  };

  const handleDetail = async (medical_id) => {
    await getMedicalDetail({ medical_id });
    await setModal(true);
  };

  const handleChangeStatus = async (type) => {
    const { medical } = medicalDetail;
    const { medical_id } = medical;
    const result = await URMedicalApi.updateMedicalStatus({
      medical_status: type,
      medical_id,
    });
    if (result) {
      setMedicalDetail({
        ...medicalDetail,
        medical: { medical_status: type },
      });
      MessageAlert.success('변경완료');
      await getMedicalStatus();
    } else {
      MessageAlert.error('변경 실패');
    }
  };

  return (
    <>
      <Row gutter={[10, 10]}>
        {/* 1열 예약 및 문의 건수 조회 열 */}
        {/* <Col span={6}>
          <Card title={'병원'}>
            <DashboardCard text={1 + '건'} />
          </Card>
        </Col>
        */}
        <Col span={6}>
          <Card title={'문진'}>
            <DashboardCard
              text={`${stringToMoneyFormat(calendar.medical)}건`}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card title={'설문'}>
            <DashboardCard text={`${stringToMoneyFormat(calendar.survey)}건`} />
          </Card>
        </Col>
        <Col span={6}>
          <Card title={'알림톡'}>
            <DashboardCard
              text={`${stringToMoneyFormat(calendar.alimtalk)}건`}
            />
          </Card>
        </Col>
        {/* REVIEW */}

        {/* 2열 일정 달력 및 예약 현황 알림 열 */}
        <Col span={24}>
          <Card>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1vw',
              }}
            >
              <Button size="large" onClick={() => handleMonth(false)}>
                &lt;
              </Button>
              <Button size="large" type="link">
                {month}
              </Button>
              <Button size="large" onClick={() => handleMonth(true)}>
                &gt;
              </Button>
            </div>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              // timeZone={'KST'}
              // date
              eventClick={(e) => {
                console.log(e.event._def.extendedProps.medical_id);
                handleDetail(e.event._def.extendedProps.medical_id);
              }}
              headerToolbar={false}
              ref={calendarRef}
              initialView="dayGridMonth"
              locale="ko"
              height={'auto'}
              events={calendar.events}
            />
          </Card>
        </Col>
      </Row>
      {medicalDetail && (
        <CustomerModal
          customer_id={medicalDetail.medical.customer_id}
          modal={modal}
          setModal={setModal}
          changeStatus={handleChangeStatus}
          medical_status={medicalDetail.medical.medical_status}
        />
      )}
    </>
  );
};

DashboardCalander.defaultProps = {
  calendar: {
    alimtalk: 300,
    survey: 150,
    medical: 100,
    events: [
      { title: 'event 1', date: '2021-04-01' },
      { title: 'event 1', date: '2021-04-01' },
      { title: 'event 1', date: '2021-04-01' },
      { title: 'event 1', date: '2021-04-01' },
      { title: 'event 1', date: '2021-04-01' },
      { title: 'event 2', date: '2021-04-02' },
    ],
  },
};

export default DashboardCalander;
