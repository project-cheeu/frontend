import React, { useEffect, useState } from 'react';
import { Button, Descriptions, Empty, Input, message, Upload } from 'antd';
import './assets-display.css';
import { InboxOutlined } from '@ant-design/icons';
import { base_url, bucket_url, MessageAlert } from 'utils';
import 'react-quill/dist/quill.snow.css';
import TextArea from 'antd/lib/input/TextArea';

const { Dragger } = Upload;

const AssetsDisplay = ({
  company,
  setCompanyInfo,
  updateCompanyInfo,
  assetsInfo,
  setAssetsInfo,
  submitAction,
}) => {
  /* Router */
  /* State */
  const [toggle, setToggle] = useState(false);
  const [fileUrl, setFileUrl] = useState(undefined);
  const [thumbnailUrl, setThumbnailUrl] = useState(undefined);

  /* Hooks */
  useEffect(() => {}, [assetsInfo]);
  /* Functions */
  /**
   * 병원 자원 수정
   * --
   * @param {Object} e
   */
  const handleSetAssetsInfo = (e) => {
    setAssetsInfo({ ...assetsInfo, [e.target.name]: e.target.value });
  };

  const fileProps = {
    name: 'files',
    multiple: true,
    action: `${base_url}/upload`,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        // console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        const [path] = info.file.response.resultData;
        setFileUrl(path);
        setAssetsInfo({ ...assetsInfo, logo_url: path });
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const thumbnailProps = {
    name: 'files',
    multiple: true,
    action: `${base_url}/upload`,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        // console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        const [path] = info.file.response.resultData;
        setThumbnailUrl(path);
        setAssetsInfo({ ...assetsInfo, company_thumbnail: path });
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  /**
   * @title 병원 자원 등록/수정 핸들러
   * @returns
   */
  const onSubmit = async () => {
    if (!assetsInfo.logo_url && !fileUrl) {
      MessageAlert.warning('이미지가 없습니다.');
      return;
    }
    const result = await submitAction();
    if (result) {
      setToggle(false);
      return true;
    }
    return false;
  };

  /**
   * @title 주변시설 입력 핸들러
   * @param {Object} e
   */
  const handleSetAmbient = (e) => {
    setAssetsInfo({ ...assetsInfo, ambient_environment: e.target.value });
  };
  const handleLimitAmbient = (e) => {
    if (assetsInfo.ambient_environment.length >= 250 && e.key !== 'Backspace') {
      e.preventDefault();
    }
    if (
      assetsInfo.ambient_environment.split('\n').length >= 6 &&
      e.key !== 'Backspace'
    ) {
      e.preventDefault();
    }
  };

  const handleSetGuidance = (e) => {
    setAssetsInfo({ ...assetsInfo, company_guidance: e.target.value });
  };

  const handleLimitGuidance = (e) => {
    if (assetsInfo.company_guidance.length >= 40 && e.key !== 'Backspace') {
      e.preventDefault();
    }

    if (
      assetsInfo.company_guidance.split('\n').length >= 3 &&
      e.key !== 'Backspace'
    ) {
      e.preventDefault();
    }
  };

  /* Render */
  return (
    <div className="assets-display-container">
      {company ? (
        <Descriptions
          title={
            <div className="company_title">
              <div>병원 자원 정보</div>
              {toggle ? (
                <Button onClick={onSubmit}>완료</Button>
              ) : (
                <Button onClick={() => setToggle(true)}>수정</Button>
              )}
            </div>
          }
          bordered
        >
          <Descriptions.Item label="로고" span={6}>
            {toggle ? (
              assetsInfo.logo_url ? (
                <img
                  style={{
                    width: '10rem',
                    height: '10rem',
                    objectFit: 'cover',
                  }}
                  src={`${bucket_url}/${assetsInfo.logo_url}`}
                  alt={assetsInfo.logo_url}
                />
              ) : fileUrl ? (
                <img
                  src={`${bucket_url}/${fileUrl}`}
                  alt={assetsInfo.logo_url}
                />
              ) : (
                <Dragger {...fileProps} style={{}}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">로고 파일을 드래그해주세요.</p>
                </Dragger>
              )
            ) : assetsInfo.logo_url ? (
              <img
                style={{
                  width: '10rem',
                  height: '10rem',
                  objectFit: 'cover',
                }}
                src={`${bucket_url}/${assetsInfo.logo_url}`}
                alt="logo"
              />
            ) : (
              '없음'
            )}
            <div style={{ padding: '1rem 0' }}>
              &#8251; 로고사진은 1:1비율을 맞추어주세요
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="대표사진" span={6}>
            {toggle ? (
              assetsInfo.company_thumbnail ? (
                <img
                  style={{
                    width: '12vw',
                    height: '9vw',
                    objectFit: 'cover',
                  }}
                  src={`${bucket_url}/${assetsInfo.company_thumbnail}`}
                  alt={assetsInfo.company_thumbnail}
                />
              ) : thumbnailUrl ? (
                <img
                  src={`${bucket_url}/${assetsInfo.company_thumbnail}`}
                  alt={assetsInfo.company_thumbnail}
                />
              ) : (
                <Dragger {...thumbnailProps} style={{}}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    대표사진 파일을 드래그해주세요.
                  </p>
                </Dragger>
              )
            ) : assetsInfo.company_thumbnail ? (
              <img
                style={{
                  width: '12vw',
                  height: '9vw',
                  objectFit: 'cover',
                }}
                src={`${bucket_url}/${assetsInfo.company_thumbnail}`}
                alt="logo"
              />
            ) : (
              '없음'
            )}
            <div style={{ padding: '1rem 0' }}>
              &#8251; 대표사진은 16:9 비율을 맞추어주세요.
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="운영시간" span={6}>
            {toggle ? (
              <Input
                name="operating_time"
                value={assetsInfo.operating_time}
                onChange={handleSetAssetsInfo}
              />
            ) : (
              assetsInfo.operating_time
            )}
          </Descriptions.Item>
          <Descriptions.Item label="주위시설" span={6}>
            {toggle ? (
              <TextArea
                value={assetsInfo.ambient_environment}
                onKeyDown={handleLimitAmbient}
                onChange={handleSetAmbient}
                rows={5}
              />
            ) : assetsInfo.ambient_environment ? (
              <div>
                {assetsInfo.ambient_environment.split('\n').map((item) => {
                  return <div>{item}</div>;
                })}
              </div>
            ) : (
              ''
            )}
          </Descriptions.Item>
          <Descriptions.Item label="간편 안내문" span={6}>
            {toggle ? (
              <TextArea
                value={assetsInfo.company_guidance}
                onChange={handleSetGuidance}
                onKeyDown={handleLimitGuidance}
              />
            ) : assetsInfo.company_guidance ? (
              <div>
                {assetsInfo.company_guidance.split('\n').map((item) => {
                  return <div>{item}</div>;
                })}
              </div>
            ) : (
              ''
            )}
          </Descriptions.Item>
          <Descriptions.Item label="특성화 진료 항목" span={6}>
            {toggle ? (
              <Input
                name="company_signature"
                value={assetsInfo.company_signature}
                onChange={handleSetAssetsInfo}
                placeholder
              />
            ) : assetsInfo.ambient_environment ? (
              assetsInfo.company_signature
            ) : (
              ''
            )}
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default AssetsDisplay;
