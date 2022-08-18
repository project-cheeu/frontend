import React from 'react';
import { Modal } from 'antd';
const ModalLayout = ({
  children,
  title,
  width,
  modal,
  setModal,
  closeAction,
  closeBtn,
}) => {
  const handleClose = () => {
    setModal(false);
    closeAction();
  };

  return (
    <Modal
      centered
      title={
        <div
          style={{
            width: '100%',
            padding: 0,
            textAlign: 'center',
          }}
        >
          {title}
        </div>
      }
      width={width}
      closable={closeBtn}
      bodyStyle={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 0,
        margin: 0,
      }}
      visible={modal}
      onCancel={handleClose}
      footer
    >
      {children}
    </Modal>
  );
};

ModalLayout.defaultProps = {
  title: '모달',
  width: '70vw',
  modal: false,
  closeBtn: false,
  setModal: () => {},
  closeAction: () => {},
};

export default ModalLayout;
