import { URWaitApi } from 'api';
import { useAppState } from 'context/MainContext';
import React, { useEffect, useState } from 'react';
import { MessageAlert } from 'utils';
import WatingPresenter from './WatingPresenter';

const WatingContainer = (props) => {
  /* Router */
  /* State */
  const [noticeList, setNoticeList] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const { company } = useAppState();
  /* Hooks */
  useEffect(() => {
    handleNoticeList();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    handleVideoList();
    // eslint-disable-next-line
  }, []);
  /* Functions */
  /**
   * 공지사항 목록 조회
   * --
   * @returns
   */
  const handleNoticeList = async () => {
    const { company_id } = company;
    const result = await URWaitApi.getNoticeList(company_id);
    if (result) {
      setNoticeList(result);
      return true;
    }
    setNoticeList([]);
    return false;
  };

  /**
   * 비디오 목록 조회
   * --
   * @returns
   */
  const handleVideoList = async () => {
    const { company_id } = company;
    const result = await URWaitApi.getVideoList(company_id);
    if (result) {
      setVideoList(result);
      return true;
    }
    setVideoList([]);
    return false;
  };

  const handleInsertNotice = async (noticeInfo) => {
    const { company_id } = company;
    const postData = {
      ...noticeInfo,
      company_id,
    };
    const result = await URWaitApi.insertNotice(postData);
    if (result) {
      await handleNoticeList();
      MessageAlert.success('등록에 성공했습니다.');
      return true;
    }
    MessageAlert.error('등록에 실패했습니다.');
    return false;
  };

  const handleInsertVideo = async (videoInfo) => {
    const { company_id } = company;
    const postData = {
      ...videoInfo,
      company_id,
    };
    const result = await URWaitApi.insertVideo(postData);
    if (result) {
      await handleVideoList();
      MessageAlert.success('등록에 성공했습니다.');
      return true;
    }
    MessageAlert.error('등록에 실패했습니다.');
    return false;
  };

  const handleUpdateVideo = async (videoInfo) => {
    const { company_id } = company;
    const postData = {
      ...videoInfo,
      company_id,
    };
    const result = await URWaitApi.updateVideo(postData);
    if (result) {
      await handleVideoList();
      MessageAlert.success('수정에 성공했습니다.');
      return true;
    }
    MessageAlert.error('수정에 실패했습니다.');
    return false;
  };

  const handleUpdateNotice = async (noticeInfo) => {
    const { company_id } = company;
    const postData = {
      ...noticeInfo,
      company_id,
    };
    const result = await URWaitApi.updateNotice(postData);
    if (result) {
      await handleNoticeList();
      MessageAlert.success('수정에 성공했습니다.');
      return true;
    }
    MessageAlert.error('수정에 실패했습니다.');
    return false;
  };

  const handleDeleteVideo = async (videoInfo) => {};

  const handleDeleteNotice = async (noticeInfo) => {};

  /* Render */
  return (
    <WatingPresenter
      noticeList={noticeList}
      videoList={videoList}
      insertNotice={handleInsertNotice}
      insertVideo={handleInsertVideo}
      updateNotice={handleUpdateNotice}
      updateVideo={handleUpdateVideo}
      deleteNotice={handleDeleteNotice}
      deleteVideo={handleDeleteVideo}
    />
  );
};

export default WatingContainer;
