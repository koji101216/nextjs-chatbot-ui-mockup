import React, { createContext, useContext, useReducer, ReactNode } from 'react';

type State = {
  username: string;
  email: string;
  notifications: boolean;
  language: string;
};

type Action =
  | { type: 'SET_USERNAME'; payload: string }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_NOTIFICATIONS'; payload: boolean }
  | { type: 'SET_LANGUAGE'; payload: string };

const initialState: State = {
  username: '',
  email: '',
  notifications: true,
  language: '日本語',
};

const GlobalStateContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

function globalStateReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_USERNAME':
      return { ...state, username: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_NOTIFICATIONS':
      return { ...state, notifications: action.payload };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    default:
      return state;
  }
}

export function GlobalStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
}