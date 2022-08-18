import React, { useEffect, useState } from 'react';
import AppPresenter from './AppPresenter';
import AppContext from '../context';
import { kakao_key, MessageAlert } from 'utils';
import { URManagerApi } from 'api';
import { InitalPage } from 'components';
import './app.css';

/**
 * @title AppContainer
 * @description App Container, Wrapp Context
 */
const AppContainer = () => {
  const [checked, setChecked] = useState(true);
  useEffect(() => {
    initKakao();
    initJennifer();
    checkApp();
    // eslint-disable-next-line
  }, []);

  const initKakao = () => {
    if (window.kakao) {
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.onload = (e) => initiate(e);
    script.onerror = (error) => handleError(error);
    script.id = 'Kakao';
    document.body.appendChild(script);
  };

  const initiate = (e) => {
    window.Kakao.init(kakao_key);
    window.Kakao.isInitialized();
  };
  const handleError = (error) => {
    // console.log(error);
  };

  const initJennifer = () => {
    (function (j, en, ni, fer) {
      j['dmndata'] = [];
      j['jenniferFront'] = function (args) {
        window.dmndata.push(args);
      };
      j['dmnaid'] = fer;
      j['dmnatime'] = new Date();
      j['dmnanocookie'] = false;
      j['dmnajennifer'] = 'JENNIFER_FRONT@INTG';
      var b = Math.floor(new Date().getTime() / 60000) * 60000;
      var a = en.createElement(ni);
      a.src = 'https://d-collect.jennifersoft.com/' + fer + '/demian.js?' + b;
      a.async = true;
      en.getElementsByTagName(ni)[0].parentNode.appendChild(a);
    })(window, document, 'script', 'd7c4da75');
  };

  const checkApp = async () => {
    const result = await URManagerApi.checkManager();
    if (result) {
      await setChecked(true);
      return;
    }
    await setChecked(false);
  };

  const insertManager = async (managerInfo) => {
    const result = await URManagerApi.insertManager(managerInfo);
    if (result) {
      MessageAlert.success('설정이 완료되었습니다. 10분 후에 재접속 해주세요.');
      return true;
    }
    MessageAlert.error('입력사항에 문제가 있습니다. 담당자에게 연락해주세요.');
    return false;
  };

  return checked ? (
    <AppContext>
      <AppPresenter />
    </AppContext>
  ) : (
    <InitalPage insertManager={insertManager} />
  );
};

export default AppContainer;
