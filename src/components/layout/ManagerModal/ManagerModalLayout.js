import React, { useEffect } from 'react';
import { HomeOutlined, InsertRowAboveOutlined } from '@ant-design/icons';
import './manager-modal.css';
import { useHistory } from 'react-router-dom';

const ManagerModalLayout = ({ closeAction, logoutAction }) => {
  const history = useHistory();
  useEffect(() => {
    return () => {
      closeAction();
    };
    // eslint-disable-next-line
  }, []);

  const handleMove = (survey) => {
    history.push(`/t/${survey}`);
    closeAction();
  };

  return (
    <div className="manager-modal-layout-contaienr">
      <div className="manager-cards">
        <div className="manager-card" onClick={() => handleMove('status')}>
          <InsertRowAboveOutlined className="cards-icon" />
          <div className="title">진료현황보기</div>
          <div className="desc">본 원의 현재 진료상황을 확인합니다.</div>
        </div>
        <div className="manager-card" onClick={logoutAction}>
          <HomeOutlined className="cards-icon" />
          <div className="title">업무종료</div>
          <div className="desc">본 원의 업무를 종료하고 로그아웃합니다.</div>
        </div>
      </div>
    </div>
  );
};

ManagerModalLayout.defaultProps = {
  closeAction: () => {},
};

export default ManagerModalLayout;
