import React, { useState } from 'react';
import moment from 'moment';
import { Button } from 'antd';
import { URFileApi } from 'api';
import { MessageAlert, bucket_url } from 'utils/';
import { useHistory } from 'react-router-dom';
import './terms.css';
import TermsModal from './TermsModal';
import ModalLayout from 'components/layout/ModalLayout';
import TermsResult from './TermsResult';
import { FormOutlined } from '@ant-design/icons';

const Terms = ({
  handleSubmit,
  userInfo,
  company,
  setAudio,
  insertLoading,
  start,
  dump = false,
}) => {
  const history = useHistory();
  const [signature, setSignature] = useState('');
  const [signatureModal, setModalSignatureModal] = useState(false);
  const [visible, setVisible] = useState(false);

  const saveSignature = async (file) => {
    const decodImg = atob(file.split(',')[1]);

    let array = [];
    for (let i = 0; i < decodImg.length; i++) {
      array.push(decodImg.charCodeAt(i));
    }

    const fileObj = new Blob([new Uint8Array(array)], { type: 'image/png' });
    const fileName = 'canvas_img_' + new Date().getMilliseconds() + '.png';
    let formData = new FormData();

    formData.append('files', fileObj, fileName);
    await URFileApi.upload(formData).then((res) => {
      const url = `${bucket_url}/${res}`;
      setSignature(url);
    });
  };

  const handleCancel = () => {
    history.push('/t');
    setVisible(false);
    setSignature('');
    MessageAlert.warning('회원등록에 실패했습니다. 다시 요청하세요.');
  };

  const submitAction = async () => {
    const { company_id } = company;
    const data = {
      ...userInfo,
      agree_date: new moment().unix(),
      company_id: company_id,
    };
    // done();
    setAudio('done');
    await handleSubmit(data);
  };

  const handleModal = () => {
    // confirm();
    setAudio('confirm');
    setVisible(true);
  };

  return (
    <div className="terms-container">
      <div className="left-side">
        <FormOutlined className="icon" />
        <div className="title">
          환자분의 소중한
          <div className="strong">서명</div>을 부탁드립니다.
        </div>
        <div className="desc">본 이용약관에 동의하신다면 서명해주세요.</div>
      </div>
      <div className="right-side">
        <div className="scripts">
          <iframe
            title="개인정보 수집 및 이용약관"
            aria-disabled
            src="https://terms.cheeu.kr/"
            frameBorder="0"
          />
        </div>
        <div className="terms-btn-group">
          <Button
            className="terms-btn"
            disabled={signature !== ''}
            onClick={() => {
              start
                ? dump
                  ? history.push('/t/signup/num/old')
                  : history.push('/t/signup/num')
                : setModalSignatureModal(true);
            }}
          >
            {signature !== '' ? (
              <img src={signature} alt="signature" width="100%" />
            ) : (
              '위 내용을 모두 읽었으며 동의합니다.'
            )}
          </Button>
        </div>
      </div>
      <ModalLayout
        modal={signatureModal}
        // setModal={setModalSignatureModal}
        // closeBtn
        title="아래 빈칸에 서명하시고 확인 버튼을 눌러주세요."
      >
        <TermsModal
          saveSignature={saveSignature}
          signatureModal={signatureModal}
          setModalSignatureModal={setModalSignatureModal}
          handleModal={handleModal}
        />
      </ModalLayout>
      <ModalLayout
        width="1000"
        modal={visible}
        setModal={setVisible}
        title="회원정보 확인"
      >
        <TermsResult
          handleCancel={handleCancel}
          submitAction={submitAction}
          userInfo={userInfo}
          insertLoading={insertLoading}
        />
      </ModalLayout>
    </div>
  );
};

export default Terms;
