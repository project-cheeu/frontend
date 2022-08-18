import React from 'react';
import { MainContextProvider } from './MainContext';

const AppContext = ({ children }) => {
  return <MainContextProvider>{children}</MainContextProvider>;
};

export default AppContext;
