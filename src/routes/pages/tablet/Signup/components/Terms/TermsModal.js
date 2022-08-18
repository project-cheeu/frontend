import React from 'react';
import TermsCanvas from './TermsCanvas';

const TermsModal = ({
  saveSignature,
  signatureModal,
  setModalSignatureModal,
  handleModal,
}) => {
  return (
    <div className="terms-modal">
      <div className="terms-canvas-container">
        {signatureModal && (
          <TermsCanvas
            width={window.innerWidth * 0.6}
            height={window.innerHeight * 0.3}
            savePng={saveSignature}
            setVisible={setModalSignatureModal}
            handleModal={handleModal}
          />
        )}
      </div>
    </div>
  );
};

export default TermsModal;
