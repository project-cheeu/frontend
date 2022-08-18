import { URKeyboard } from 'components/lib';
import React from 'react';

const LayerKeyboard = ({
  result,
  keyboardOpen,
  setKeyboardOpen,
  setResult,
  enterAction,
}) => {
  const [_result, set_result] = React.useState('');
  const handleEnterActions = () => {
    enterAction(_result);
    set_result('');
  };
  const handleResult = (val) => {
    set_result(val);
    setResult(val);
  };
  return (
    keyboardOpen && (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '30%',
            fontSize: '3vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {_result ? _result : '내용을 입력해주세요.'}
        </div>
        <div
          style={{
            width: '100%',
            margin: '0 auto',
          }}
        >
          <URKeyboard
            keyOpen={keyboardOpen}
            setKeyboard={setKeyboardOpen}
            setResult={handleResult}
            enterAction={handleEnterActions}
          />
        </div>
      </div>
    )
  );
};

export default LayerKeyboard;
