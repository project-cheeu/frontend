import React from 'react';
import { QuestionOutlined } from '@ant-design/icons';

import './medical-modal.css';
const SurveyModal = ({ userInfo, history }) => {
  return (
    userInfo && (
      <div className="medical-modal-container">
        <div className="medical-cards">
          <div className="medical-card">
            <QuestionOutlined className="cards-icon" />
            <div className="title">문진표 작성</div>
            <div className="desc">
              문진표 작성을 진행할 고객들을 확인합니다.
            </div>
          </div>
          <div className="medical-card">
            <QuestionOutlined className="cards-icon" />
            <div className="title">ㅇㅇ</div>
            <div className="desc">
              문진표 작성을 진행할 고객들을 확인합니다.
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default SurveyModal;
