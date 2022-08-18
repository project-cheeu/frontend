import React, { useState } from 'react';
import {
  Descriptions,
  Drawer,
  Input,
  Upload,
  message,
  Image,
  Button,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { base_url, bucket_url, MessageAlert } from 'utils';
const { Dragger } = Upload;

const AgreementFormRegist = ({
  visible,
  onClose,
  company_id,
  submitAction,
}) => {
  const [agreement, setAgreement] = useState({
    form_nm: '',
    form_content: '',
    usage: true,
    company_id: company_id,
  });

  const [fileUrl, setFileUrl] = useState(undefined);
  const fileProps = {
    name: 'files',
    multiple: true,
    action: `${base_url}/upload/agreement/${company_id}`,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        // console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        const [path] = info.file.response.result;
        setFileUrl(path);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const onSubmit = async () => {
    if (agreement.form_nm.length <= 5) {
      MessageAlert.warning('동의서명이 너무 짧습니다.');
      return;
    }
    if (!fileUrl) {
      MessageAlert.warning('동의서 이미지가 없습니다.');
      return;
    }
    const postData = {
      ...agreement,
      form_content: fileUrl,
    };
    const result = await submitAction(postData);
    if (result) {
      onClose();
      return;
    }
  };

  return (
    <Drawer
      title="동의서 등록"
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
      width={'50vw'}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            취소
          </Button>
          <Button type="primary" onClick={onSubmit}>
            등록
          </Button>
        </div>
      }
    >
      <div style={{ width: '100%' }}>
        <Descriptions layout="vertical">
          <Descriptions.Item label="동의서 제목" span={3}>
            <Input
              name="form_nm"
              placeholder="동의서 제목을 입력하세요."
              value={agreement.form_nm}
              onChange={(e) =>
                setAgreement({ ...agreement, [e.target.name]: e.target.value })
              }
            />
          </Descriptions.Item>
          <Descriptions.Item label="동의서 제목" span={4}>
            {fileUrl ? (
              <Image src={`${bucket_url}/${fileUrl}`} alt="동의서 제목" />
            ) : (
              <div style={{ padding: '1vw' }}>
                <Dragger {...fileProps} style={{}}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    동의서 파일을 드래그해주세요.
                  </p>
                  <p className="ant-upload-hint">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Ducimus hic quidem nostrum molestias perspiciatis ipsa a
                    assumenda. Aliquam velit sunt doloribus repudiandae nobis
                    hic autem veritatis! Quod, odio amet! Maxime.
                  </p>
                </Dragger>
              </div>
            )}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </Drawer>
  );
};

export default AgreementFormRegist;
