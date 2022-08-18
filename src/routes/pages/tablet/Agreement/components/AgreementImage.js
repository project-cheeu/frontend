import { Image } from 'antd';
import React from 'react';

const AgreementImage = ({ width, height, url }) => {
  // let canvas;
  // let ctx;
  // let canvasRef = createRef();
  // React.useEffect(() => {
  //   draw();
  //   // eslint-disable-next-line
  // }, [url]);

  // const draw = () => {
  //   canvas = canvasRef.current;
  //   ctx = canvas.getContext('2d');
  //   //이미지 객체 생성
  //   var imgClo = new Image();
  //   imgClo.src = url;
  //   imgClo.width = 1000;
  //   imgClo.height = 1000;
  //   imgClo.onload = function () {
  //     ctx.drawImage(imgClo, 0, 0, width, height);
  //   };

  //페이지 로드후 이미지가 로드 되었을 때 이미지 출력

  //이미지 경로 설정
  // imgClo.src = 'clo.jpg';
  // };
  // return <canvas ref={canvasRef} width={width} height={height}></canvas>;
  return <Image src={url} style={{ padding: '1vh 1vw' }} />;
};

export default AgreementImage;
