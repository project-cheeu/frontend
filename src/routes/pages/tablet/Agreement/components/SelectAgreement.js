import { Alert, Button, List, Typography } from 'antd';
import moment from 'moment';
import React from 'react';
const { Text } = Typography;

const SelectAgreement = ({
  agreementList,
  setToggle,
  agreement,
  handleAgreement,
}) => {
  return (
    <div style={{ width: '100%', padding: '1vw' }}>
      <div style={{ padding: '0 0 0.5vh 0' }}>
        <Alert
          message={
            <>
              <Typography>
                본 병원에 등록된 동의서는{' '}
                <Text strong>{agreementList.length}</Text>건입니다.
              </Typography>
            </>
          }
          description={<>아래에서 동의서를 선택해주세요.</>}
          type="info"
          showIcon
        />
      </div>
      <List
        size="large"
        bordered
        dataSource={agreementList}
        footer={
          agreement && (
            <div>
              <Button size="large" onClick={setToggle}>
                다음
              </Button>
            </div>
          )
        }
        renderItem={(item) => {
          const { form_id, form_nm, created_at, checked } = item;
          return (
            <List.Item
              style={{
                backgroundColor: checked && '#40a9ff',
                color: checked && 'white',
              }}
              onClick={() => {
                handleAgreement(form_id);
              }}
            >
              <div>
                {form_nm}({moment(created_at * 1000).format('ll')}자 버전)
              </div>
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default SelectAgreement;
