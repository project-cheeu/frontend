import { Button, Result } from 'antd';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './result-page.css';
import MAIN_VISUAL from 'assets/result_visual1.png';
import BOTTON_ICON from 'assets/result_bottom_icon.png';

const ResultPage = ({ title, desc, userInfo }) => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      if (history.location.pathname !== '/t') {
        history.replace('/t');
      }
    }, 3000);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="result-page-container">
      <div className="result-page">
        <Result
          icon={<img className="visual" src={MAIN_VISUAL} alt="main_visual" />}
          title={
            <div className="result-title">
              <div>
                {history.location.state
                  ? history.location.state.survey &&
                    '문진/설문이 완료되었습니다.'
                  : title}
              </div>
              <div>{desc}</div>
            </div>
          }
          extra={
            <div>
              <Button
                type="default"
                size="large"
                className="result-btn"
                onClick={() => history.replace('/t')}
              >
                {/* 접수화면으로 */}
                <img
                  src={BOTTON_ICON}
                  alt="result_bottom_icon"
                  className="btn-icon"
                />{' '}
                카카오톡 알림을 못받으셨나요? 데스크에 문의주세요 :)
              </Button>
            </div>
          }
        />
      </div>
    </div>
  );
};

ResultPage.defaultProps = {
  title: '접수가 완료되었습니다.',
  desc: '대기실에서 잠시 기다려주세요.',
};

export default ResultPage;
