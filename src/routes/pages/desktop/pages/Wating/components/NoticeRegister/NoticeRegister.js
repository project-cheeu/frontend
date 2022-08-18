import { Button } from 'antd';
import React, { useState } from 'react';
import './notice-register.css';
const NoticeRegister = ({ onCancel, onSubmit }) => {
  /* Router */
  /* State */
  const initialState = {
    notice_title: '',
    notice_content: '',
    notice_order: 0,
  };
  const [noticeInfo, setNoticeInfo] = useState(initialState);
  /* Hooks */
  /* Functions */
  const handleNoticeInfo = (e) => {
    setNoticeInfo({ ...noticeInfo, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setNoticeInfo(initialState);
    onCancel();
  };

  const handleSubmit = async () => {
    const result = await onSubmit(noticeInfo);
    if (result) {
      setNoticeInfo(initialState);
      onCancel();
      return true;
    } else {
      return false;
    }
  };

  /* Render */
  return (
    <div className="notice-container">
      <div className="notice-item">
        <div className="notice-info">공지사항 제목</div>
        <input
          type="text"
          name="notice_title"
          className="notice-input"
          value={noticeInfo.notice_title}
          onChange={handleNoticeInfo}
        />
      </div>
      <div className="notice-item">
        <div className="notice-info">공지사항 내용</div>
        <textarea
          rows={10}
          name="notice_content"
          className="notice-input"
          value={noticeInfo.notice_content}
          onChange={handleNoticeInfo}
        />
      </div>
      <div className="btn-item">
        <Button block type="primary" onClick={handleSubmit}>
          등록
        </Button>
        <Button block danger onClick={handleCancel}>
          취소
        </Button>
      </div>
    </div>
  );
};

export default NoticeRegister;
