import React, { useState } from 'react';
import { URFileApi } from 'api';
import { useAppState } from 'context/MainContext';
import { bucket_url } from 'utils';
import './agreement.css';
import { SelectAgreement, SignatureAgreement } from './components';
const AgreementPresenter = ({
  agreementList,
  setAgreementList,
  customerInfo,
  insertAgreement,
}) => {
  const { member } = useAppState();
  const { member_nm } = member;

  const [toggle, setToggle] = useState(false);
  const [agreement, setAgreement] = useState(undefined);
  const [modal, setModal] = useState(false);
  const [signature, setSignature] = useState(undefined);
  const [agreementImage, setAgreementImage] = useState(undefined);
  const handleAgreement = (active_id) => {
    const temp = agreementList.map((item) => {
      const { form_id } = item;
      if (form_id === active_id) {
        setAgreement(item);
      }
      return {
        ...item,
        checked: active_id === form_id,
      };
    });
    setAgreementList(temp);
  };
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
      const { form_id } = agreement;
      const postData = {
        img_url: url,
        form_id: form_id,
      };
      insertAgreement(postData);
    });
  };

  // const

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        overflow: 'auto',
      }}
    >
      <div
        style={{
          width: '92.5%',
          backgroundColor: 'white',
        }}
      >
        {toggle ? (
          <SignatureAgreement
            agreement={agreement}
            customerInfo={customerInfo}
            modal={modal}
            saveAction={saveSignature}
            setModal={setModal}
            member_nm={member_nm}
            signature={signature}
            agreementImage={agreementImage}
            setAgreementImage={setAgreementImage}
          />
        ) : (
          <SelectAgreement
            agreement={agreement}
            agreementList={agreementList}
            handleAgreement={handleAgreement}
            setToggle={setToggle}
          />
        )}
      </div>
    </div>
  );
};

export default AgreementPresenter;
