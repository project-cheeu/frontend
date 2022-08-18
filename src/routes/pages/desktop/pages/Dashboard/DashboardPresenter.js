import React from 'react';
import { DashboardCalander, DashboardStatus } from './components';

const DashboardPresenter = ({
  screen,
  setScreen,
  medicalList,
  getMedicalDetail,
  medicalDetail,
  dashboard,
  setMedicalDetail,
  getMedicalStatus,
  month,
  setMonth,
  calendar,
}) => {
  /* Router */
  /* State */
  /* Hooks */
  /* Functions */
  /* Render */
  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          position: 'absolute',
          width: '3vw',
          height: '3vw',
          borderRadius: '50%',
          bottom: '1vw',
          right: '1vh',
          zIndex: 2,
          backgroundColor: '#1890ff',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '0.5vw',
        }}
        onClick={() => setScreen(!screen)}
      >
        {screen ? '진료현황' : '캘린더'}
      </div>
      {screen ? (
        <DashboardCalander
          month={month}
          setMonth={setMonth}
          calendar={calendar}
          medicalDetail={medicalDetail}
          setMedicalDetail={setMedicalDetail}
          getMedicalDetail={getMedicalDetail}
          getMedicalStatus={getMedicalStatus}
        />
      ) : (
        <DashboardStatus
          medicalList={medicalList}
          medicalDetail={medicalDetail}
          onClick={getMedicalDetail}
          dashboard={dashboard}
          setMedicalDetail={setMedicalDetail}
          getMedicalStatus={getMedicalStatus}
        />
      )}
    </div>
  );
};

export default DashboardPresenter;
