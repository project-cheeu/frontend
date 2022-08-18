import { Button, Descriptions, Input, Modal } from 'antd';
import AdminGrid from 'components/layout/AdminGrid';
import React from 'react';

const MedicalSubjectRegister = ({
  visible,
  setVisible,
  insertMedicalSubject,
  setMedicalInfo,
  medicalInfo,
}) => {
  const handleSetVisible = (val) => {
    setMedicalInfo({});
    setVisible(val);
  };
  return (
    <Modal
      title={'진료코드 등록'}
      centered
      visible={visible}
      onOk={() => handleSetVisible(false)}
      closeIcon
      onCancel={() => handleSetVisible(false)}
      footer={null}
      width={'60vw'}
      bodyStyle={{ padding: 0, margin: 0 }}
    >
      <AdminGrid>
        <div style={{ padding: '1%' }}>
          <div>진료 코드를 등록합니다.</div>
          <div>진료명과 진료코드 설명을 입력하세요.</div>
        </div>
        <div className="admin-company-submit">
          <Descriptions bordered>
            <Descriptions.Item label="진료 코드명" span={4}>
              <Input
                name="subject_nm"
                value={medicalInfo.subject_nm}
                onChange={(e) =>
                  setMedicalInfo({
                    ...medicalInfo,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </Descriptions.Item>
            <Descriptions.Item label="진료 코드 설명" span={4}>
              <Input
                name="subject_desc"
                value={medicalInfo.subject_desc}
                onChange={(e) =>
                  setMedicalInfo({
                    ...medicalInfo,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </Descriptions.Item>
          </Descriptions>
        </div>
        <div
          style={{
            width: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto',
          }}
        >
          <Button
            block
            type="primary"
            size="large"
            style={{ margin: '1% 0' }}
            onClick={insertMedicalSubject}
          >
            등록
          </Button>
        </div>
      </AdminGrid>
    </Modal>
  );
};

export default MedicalSubjectRegister;
