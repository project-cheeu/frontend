import { Alert, Button, Descriptions, Typography } from 'antd';
import moment from 'moment';
import React, { createRef } from 'react';
import { bucket_url, MessageAlert } from 'utils';
import Signature from './Signature';

import html2canvas from 'html2canvas';
import AgreementImage from './AgreementImage';

const { Text } = Typography;
const SignatureAgreement = ({
  agreement,
  customerInfo,
  setModal,
  modal,
  saveAction,
  member_nm,
  signature,
  agreementImage,
  setAgreementImage,
}) => {
  const captureRef = createRef();

  const getScreenshotHandler = async () => {
    if (signature) {
      MessageAlert.warning('사인해주세요.');
      return;
    }

    await html2canvas(captureRef.current, {
      logging: true,
      letterRendering: 1,
      // allowTaint: true,
      // taintTest: true,
      // useCORS: true,
      // proxy: true,
      onrendered: function (canvas) {
        const img = canvas.toDataURL('image/png');
        setAgreementImage(img);
      },
    }).then((canvas) => {
      const img = canvas.toDataURL('image/png');
      setAgreementImage(img);
      saveAction(img);
      // window.open(img);
    });
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        width: '100%',
        // height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          width: '100%',
          padding: '1vh 1vw',
        }}
      >
        <Alert
          message={
            <>
              <Typography>
                <Text strong>{agreement.form_nm}</Text>에 대한 동의 내용입니다.
              </Typography>
            </>
          }
          description={
            <>내용을 잘 확인하시고 하단의 서명하기 버튼을 눌러주세요.</>
          }
          type="info"
          showIcon
        />
      </div>
      <AgreementImage
        width="1000"
        height="1000"
        url={`${bucket_url}/${agreement.form_content}`}
      />
      <div
        style={{ border: '1px solid lightgray', padding: '1vh 1vw' }}
        ref={captureRef}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '60%',
              height: '240px',

              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => {
              setModal(true);
            }}
          >
            {!signature ? (
              <Signature
                //  setVisible={setModal}
                width={640}
                height={240}
                footer={false}
                //  savePng={saveAction}
              />
            ) : (
              '서명'
            )}
          </div>
          <div
            style={{
              width: '30%',
              textAlign: 'right',
              padding: '1vw',
              display: 'flex',
            }}
          >
            <Descriptions>
              <Descriptions.Item label="서명일" span={4}>
                {moment().format('llll')}
              </Descriptions.Item>
              <Descriptions.Item label="환자(보호자)성명" span={4}>
                {customerInfo.customer_nm}{' '}
              </Descriptions.Item>
              <Descriptions.Item label="환자 주소" span={4}>
                {customerInfo.customer_addr}
              </Descriptions.Item>
              <Descriptions.Item label="환자 전화번호" span={4}>
                {customerInfo.customer_tel}
              </Descriptions.Item>
              <Descriptions.Item label="병원 담당자" span={4}>
                {member_nm}{' '}
              </Descriptions.Item>
            </Descriptions>
          </div>
        </div>
      </div>
      <div style={{ width: '100%', height: '120px', padding: '1vw' }}>
        <Button
          size="large"
          type="primary"
          block
          disabled={signature}
          style={{ height: '100%', fontWeight: 'bold' }}
          onClick={getScreenshotHandler}
        >
          제출하기
        </Button>
      </div>
    </div>
  );
};

export default SignatureAgreement;
