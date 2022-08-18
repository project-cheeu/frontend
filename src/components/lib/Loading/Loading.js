import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';
import './loading.css';
const Loading = () => {
  return (
    <div className="loading-container">
      <LoadingOutlined className="loading-item" />
    </div>
  );
};

export default Loading;
