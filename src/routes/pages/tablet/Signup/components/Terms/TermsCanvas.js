import { Button } from 'antd';
import React, { createRef, useEffect } from 'react';
import { MessageAlert } from 'utils';
import './terms.css';
const TermsCanvas = ({ width, height, savePng, setVisible, handleModal }) => {
  let canvas;
  let ctx;
  let canvasRef = createRef();

  let pos = {
    drawble: false,
    X: -1,
    Y: -1,
  };

  useEffect(() => {
    init();
    return () => {
      drawClaer();
    };
  });

  const saveImg = async () => {
    const pixelBuffer = new Uint32Array(
      ctx.getImageData(0, 0, canvas.width, canvas.height).data.buffer
    );
    const blank = !pixelBuffer.some((color) => color !== 0);
    if (blank) {
      MessageAlert.error('서명을 입력해주세요.');
      return;
    }
    const img = canvas.toDataURL('image/png');
    if (img) {
      setVisible(false);
      handleModal();
      await savePng(img);
      celarDraw();
      return true;
    }
    // const img = canvas.toDataURL('image/jpeg', 'image/octet-stream');
    // const decodeImg = window.atob(img.split(',')[1]);

    return img;
  };

  const init = () => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
    canvas.addEventListener('touchstart', initDraw, false);
    canvas.addEventListener('touchmove', draw, false);
    canvas.addEventListener('touchcancel', finishDraw, false);
    canvas.addEventListener('touchend', finishDraw, false);
    canvas.addEventListener('mousedown', initDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', finishDraw);
    canvas.addEventListener('mouseout', finishDraw);
  };

  const getPosition = (e) => {
    e.preventDefault();
    return {
      X: e.targetTouches[0].pageX - canvas.getBoundingClientRect().left,
      Y: e.targetTouches[0].pageY - canvas.getBoundingClientRect().top,
    };
  };

  const initDraw = (e) => {
    e.preventDefault();

    if (e.targetTouches.length >= 1) {
      ctx.beginPath();
      pos = { drawble: true, ...getPosition(e) };
      ctx.moveTo(pos.X, pos.Y);
    }
  };

  const draw = (e) => {
    e.preventDefault();

    if (e.targetTouches.length >= 1) {
      if (pos.drawble) {
        pos = { ...pos, ...getPosition(e) };
        ctx.lineTo(pos.X, pos.Y);
        ctx.stroke();
      }
    }
  };

  const finishDraw = () => {
    pos = { drawble: false, X: -1, Y: -1 };
  };

  // 컨텍스트 리셋
  // eslint-disable-next-line
  const drawClaer = async () => {
    return false;
  };

  const celarDraw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="terms-canvas"
      ></canvas>
      <div className="btn-group">
        <Button danger className="terms-canvas-btn" onClick={celarDraw}>
          지움
        </Button>
        <Button type="primary" className="terms-canvas-btn" onClick={saveImg}>
          확인
        </Button>
      </div>
    </>
  );
};

export default TermsCanvas;
