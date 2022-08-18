import { Alert, Button, Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import './video-register.css';
import VIDEO_NOTICE from 'assets/video_notice.png';
const VideoRegister = ({ onCancel, onSubmit, videoData, onUpdate }) => {
  /* Router */
  /* State */
  const initialState = {
    video_title: '',
    video_url: '',
  };
  const [videoInfo, setVideoInfo] = useState(initialState);
  /* Hooks */
  useEffect(() => {
    if (videoData) {
      setVideoInfo(videoData);
    }
    // eslint-disable-next-line
  }, []);
  /* Functions */
  const handleVideoInfo = (e) => {
    setVideoInfo({ ...videoInfo, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setVideoInfo(initialState);
    onCancel();
  };

  const handleSubmit = async () => {
    let result;
    if (videoData) {
      result = await onUpdate(videoInfo);
    } else {
      result = await onSubmit(videoInfo);
    }
    // const result = await onSubmit(videoInfo);
    if (result) {
      setVideoInfo(initialState);
      onCancel();
      return true;
    } else {
      return false;
    }
  };

  /* Render */
  return (
    <div className="video-container">
      <Alert
        message="경고"
        description={
          <div>
            유튜브 재생목록 주소의 ?list= 뒷 부분을 입력해주세요.
            <div>
              <img src={VIDEO_NOTICE} width="400" alt="video_notice" />
            </div>
          </div>
        }
        type="info"
      />
      <Divider />
      <div className="video-item">
        <div className="video-info">재생목록명</div>
        <input
          type="text"
          name="video_title"
          className="video-input"
          value={videoInfo.video_title}
          onChange={handleVideoInfo}
        />
      </div>
      <div className="video-item">
        <div className="video-info">재생목록주소</div>
        <input
          type="text"
          name="video_url"
          className="video-input"
          value={videoInfo.video_url}
          onChange={handleVideoInfo}
        />
      </div>
      <div className="btn-item">
        <Button block type="primary" onClick={handleSubmit}>
          {videoData ? '수정' : '등록'}
        </Button>
        <Button block danger onClick={handleCancel}>
          취소
        </Button>
      </div>
    </div>
  );
};

export default VideoRegister;
