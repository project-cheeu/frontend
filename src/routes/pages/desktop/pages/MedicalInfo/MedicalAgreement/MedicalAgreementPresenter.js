import React, { useState } from 'react';
import { AdminGrid } from 'components';
import { Alert, Button, Image, Switch, Table, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import { AgreementFormRegist } from './components';
import { bucket_url } from 'utils';

const { Text } = Typography;

const MedicalAgreementPresenter = ({
  agreementList,
  agreement,
  insertForm,
  company_id,
  updateForm,
  deleteForm,
}) => {
  /* State */
  const [visible, setVisible] = useState(false);
  const columns = [
    {
      title: '번호',
      dataIndex: 'idx',
      render: (val, obj, idx) => {
        return idx + 1;
      },
    },
    {
      title: '동의서 제목',
      dataIndex: 'form_nm',
      render: (val, obj, idx) => {
        return (
          <Typography.Text
            editable={{ onChange: (e) => updateForm({ ...obj, form_nm: e }) }}
          >
            {val}
          </Typography.Text>
        );
      },
    },
    {
      title: '동의서 내용',
      dataIndex: 'form_content',
      render: (val, obj, idx) => {
        return (
          <Image width={200} src={`${bucket_url}/${val}`} alt={obj.form_id} />
        );
      },
    },
    {
      title: '생성일자',
      dataIndex: 'created_at',
      render: (val, obj, idx) => {
        return moment(val * 1000).format('llll');
      },
    },
    {
      title: '사용여부',
      dataIndex: 'usage',
      render: (val, obj, idx) => {
        return (
          <Switch
            checked={val}
            onChange={(e) => updateForm({ ...obj, usage: e })}
          />
        );
      },
    },
    {
      title: '삭제',
      dataIndex: 'form_id',
      render: (val, obj, idx) => {
        return (
          <DeleteOutlined
            style={{ color: '#f00', fontSize: '1.5rem' }}
            onClick={() => deleteForm(val)}
          />
        );
      },
    },
  ];
  /* Functions */
  const onClose = () => {
    setVisible(false);
  };
  return (
    <AdminGrid>
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
          description={
            <>
              <Button type="default" size="large" onClick={setVisible}>
                추가하기
              </Button>
            </>
          }
          type="success"
          showIcon
        />
      </div>
      <Table
        columns={columns}
        dataSource={agreementList.sort((a, b) => b.created_at - a.created_at)}
      />
      <AgreementFormRegist
        visible={visible}
        onClose={onClose}
        company_id={company_id}
        submitAction={insertForm}
      />
    </AdminGrid>
  );
};

MedicalAgreementPresenter.defaultProps = {
  agreementList: [],
};

export default MedicalAgreementPresenter;
