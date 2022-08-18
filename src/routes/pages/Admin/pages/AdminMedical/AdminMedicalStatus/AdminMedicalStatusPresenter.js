import React, { useState } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { MedicalSubjectModify, MedicalSubjectRegister } from './components';
import AdminGrid from 'components/layout/AdminGrid';
import { URMedicalApi } from 'api';
import { MessageAlert } from 'utils';

const AdminMedicalStatusPresenter = ({ subjectList, getMedicalSubject }) => {
  const [register, setRegister] = useState(false);
  const [medicalInfo, setMedicalInfo] = useState({});
  const [modify, setModify] = useState(false);

  const handleInsertMedicalSubject = async () => {
    const result = await URMedicalApi.insertMedicalSubject(medicalInfo);
    if (result) {
      await MessageAlert.success('진료코드 등록에 성공했습니다.');
      await getMedicalSubject();
      await setRegister(false);
      await setMedicalInfo({});
      return;
    }
    await MessageAlert.error('진료코드 등록에 실패했습니다.');
  };

  const handleSubjectDetail = (item) => {
    setMedicalInfo(item);
    setModify(true);
  };

  const handleUpdateMedicalSubject = async () => {
    const result = await URMedicalApi.updateMedicalSubject(medicalInfo);
    if (result) {
      await MessageAlert.success('진료코드 수정에 성공했습니다.');
      await getMedicalSubject();
      await setModify(false);
      await setMedicalInfo({});
      return;
    }
    await MessageAlert.error('진료코드 수정에 실패했습니다.');
  };

  const handleDeleteMedicalSubject = async (item) => {
    const { subject_code_id } = item;
    const deleteData = {
      subject_code_id: subject_code_id,
    };
    const result = await URMedicalApi.deleteMedicalSubject(deleteData);
    if (result) {
      await MessageAlert.success('진료코드 삭제에 성공했습니다.');
      await getMedicalSubject();
      setModify(false);
      setMedicalInfo({});
      return;
    }
    await MessageAlert.error('진료코드 수정에 실패했습니다.');
  };

  const medicalItem = subjectList.map((item) => {
    const { subject_code_id, subject_nm, subject_desc } = item;
    return (
      <Card
        key={subject_code_id}
        style={{
          width: '15vw',
          height: '10vh',
          margin: '1%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
        bordered
        hoverable
        onClick={() => handleSubjectDetail(item)}
      >
        <h3>{subject_nm}</h3>
        <div>{subject_desc}</div>
      </Card>
    );
  });

  return (
    <AdminGrid>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        <Card
          style={{
            width: '15vw',
            height: '10vh',
            margin: '1%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.5vw',
          }}
          bordered
          hoverable
          onClick={() => setRegister(true)}
        >
          <PlusCircleOutlined />
        </Card>
        {medicalItem}
      </div>
      <MedicalSubjectRegister
        visible={register}
        setVisible={setRegister}
        medicalInfo={medicalInfo}
        setMedicalInfo={setMedicalInfo}
        insertMedicalSubject={handleInsertMedicalSubject}
      />
      <MedicalSubjectModify
        visible={modify}
        setVisible={setModify}
        medicalInfo={medicalInfo}
        setMedicalInfo={setMedicalInfo}
        updateMedicalSubject={handleUpdateMedicalSubject}
        deleteMedicalSubject={handleDeleteMedicalSubject}
      />
    </AdminGrid>
  );
};

export default AdminMedicalStatusPresenter;
