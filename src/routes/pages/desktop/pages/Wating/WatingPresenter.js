import { AdminGrid } from 'components';
import { Button, Collapse, Divider, Drawer } from 'antd';
import React, { useState } from 'react';
import { NoticeRegister, VideoRegister } from './components';

const { Panel } = Collapse;

const WatingPresenter = ({
  videoList,
  noticeList,
  insertNotice,
  updateNotice,
  deleteNotice,
  insertVideo,
  updateVideo,
  deleteVideo,
}) => {
  /* Router */
  /* State */
  const [videoToggle, setVideoToggle] = useState(false);
  const [noticeToggle, setNoticeToggle] = useState(false);
  const [modify, setModify] = useState(false);
  /* Hooks */
  /* Functions */
  const closeVideo = () => {
    setVideoToggle(false);
    setModify(false);
  };

  const closeNotice = () => {
    setNoticeToggle(false);
    setModify(false);
  };
  const handleUpate = (data) => {
    setModify(data);
  };

  /* Render */
  return (
    <AdminGrid>
      <div>
        <div>
          <h2>
            재생목록 관리{' '}
            {videoList.length === 0 && (
              <Button onClick={() => setVideoToggle(true)}>등록</Button>
            )}
          </h2>
          <div>
            {videoList.map((item) => {
              const { video_id, video_title, video_url } = item;
              console.log(video_url);
              return (
                <div id={video_id}>
                  <div>
                    {video_title}{' '}
                    <Button
                      onClick={() => {
                        handleUpate(item);
                        setVideoToggle(true);
                      }}
                    >
                      수정
                    </Button>
                  </div>
                  <br />
                  <iframe
                    width={720}
                    height={409}
                    title="CheeU"
                    src={`https://www.youtube.com/embed/videoseries?list=${video_url}&autoplay=1&mute=1`}
                    frameborder="0"
                    allow="accelerometer; autoplay; mute; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              );
            })}
            {videoList.length === 0 && '재생목록이 없습니다.'}
          </div>
        </div>
        <Drawer
          title="재생목록 등록"
          width={480}
          visible={videoToggle}
          onClose={closeVideo}
        >
          <VideoRegister
            videoData={modify}
            onCancel={closeVideo}
            onSubmit={insertVideo}
            onUpdate={updateVideo}
          />
        </Drawer>
        <Divider />
        <div>
          <h2>
            공지사항 관리{' '}
            <Button onClick={() => setNoticeToggle(true)}>등록</Button>
          </h2>
          <div>
            <Collapse>
              {noticeList.map((item) => {
                const { notice_id, notice_title, notice_content } = item;
                return (
                  <Panel header={notice_title} key={notice_id}>
                    {notice_content.split('\n').map((item) => {
                      return <div>{item}</div>;
                    })}
                  </Panel>
                );
              })}
            </Collapse>
            {noticeList.length === 0 && '공지사항이 없습니다.'}
          </div>
        </div>
        <Drawer
          title="공지사항 등록"
          width={480}
          visible={noticeToggle}
          onClose={closeNotice}
        >
          <NoticeRegister onCancel={closeNotice} onSubmit={insertNotice} />
        </Drawer>
      </div>
    </AdminGrid>
  );
};

export default WatingPresenter;
