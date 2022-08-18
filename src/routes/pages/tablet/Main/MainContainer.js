import React from 'react';
import { useAppState } from 'context//MainContext';
// import MainPresenter from './MainPresenter';
import _MainPresenter from './_MainPresenter';

/**
 * @title MainContainer
 * @description 메인화면 컨테이너
 */
const MainContainer = (props) => {
  const {
    company,
    // assets,
  } = useAppState();

  // return <MainPresenter company={company} member={member} />;
  // eslint-disable-next-line
  return <_MainPresenter company={company} />;
  // return <MainPresenter />;
};

export default MainContainer;
