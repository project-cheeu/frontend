import React from 'react';
import { Button, Descriptions, Input, Modal, Popconfirm } from 'antd';
import AdminGrid from 'components/layout/AdminGrid';

const MedicalSubjectModify = ({
  visible,
  setVisible,
  updateMedicalSubject,
  setMedicalInfo,
  medicalInfo,
  deleteMedicalSubject,
}) => {
  const handleSetVisible = (val) => {
    setMedicalInfo({});
    setVisible(val);
  };

  const handleDeleteMedicalSubject = async () => {
    await deleteMedicalSubject(medicalInfo);
  };

  return (
    <Modal
      title={'진료코드 수정'}
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
          <div>진료 코드를 수정합니다.</div>
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
            type="primary"
            block
            size="large"
            style={{ margin: '1% 1%' }}
            onClick={updateMedicalSubject}
          >
            수정
          </Button>
          <Popconfirm
            title="정말 삭제하시겠습니까?"
            onConfirm={handleDeleteMedicalSubject}
            okText="네"
            cancelText="아니오"
          >
            <Button block size="large" danger style={{ margin: '1% 1%' }}>
              삭제
            </Button>
          </Popconfirm>
        </div>
      </AdminGrid>
    </Modal>
  );
};

export default MedicalSubjectModify;
