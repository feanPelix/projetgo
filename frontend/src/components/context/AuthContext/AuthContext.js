import React, { createContext, useReducer } from 'react';

export const AuthContext = createContext();

const loadFromStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (err) {
    localStorage.clear();
    return null;
  }
};

const initialState = {
  isAuthenticated: !!loadFromStorage('user'),
  user: loadFromStorage('user'),
  member: loadFromStorage('member'),
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('member', JSON.stringify(action.payload.member));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        member: action.payload.member,
      };

    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        member: null,
      };

    default:
      return state;
  }
};

export function AuthContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{state, dispatch}}>
      {props.children}
    </AuthContext.Provider>
  );
}