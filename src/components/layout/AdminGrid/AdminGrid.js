import React from 'react';

const AdminGrid = ({ children }) => {
  return (
    <>
      <div style={style.container}>{children}</div>
    </>
  );
};

const style = {
  container: {
    width: '100%',
    minHeight: '50%',
    padding: '1%',
    backgroundColor: 'white',
    borderRadius: '0 0 2px 2px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.10)',
  },
};

export default AdminGrid;
