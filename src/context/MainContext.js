import React, { createContext, useContext, useReducer } from 'react';
import { mainReducer, initialState } from './MainReducer';

const StateContenxt = createContext(undefined);

const DispatchContext = createContext(undefined);

export function MainContextProvider({ children }) {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContenxt.Provider value={state}>{children}</StateContenxt.Provider>
    </DispatchContext.Provider>
  );
}

export function useAppState() {
  const state = useContext(StateContenxt);
  if (!state) throw new Error('MainContext not found');
  return state;
}

export function useAppDispatch() {
  const dispatch = useContext(DispatchContext);
  if (!dispatch) throw new Error('MainContext not found');
  return dispatch;
}
