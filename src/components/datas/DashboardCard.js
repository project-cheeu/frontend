import React from 'react';

const DashboardCard = ({ text, cardAction, color }) => {
  return (
    <div
      style={{
        fontSize: '30px',
        textAlign: 'center',
        fontWeight: 'bold',
        cursor: 'pointer',
        padding: 0,
      }}
      onClick={cardAction}
    >
      <span style={{ color }}>{text}</span>
    </div>
  );
};

export default DashboardCard;
