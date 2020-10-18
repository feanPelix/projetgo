import React, { createContext, useReducer } from 'react';

export const AuthContext = createContext();

const loadUserFromStorage = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  } catch (err) {
    localStorage.clear();
    return null;
  }
};

const initialState = {
  isAuthenticated: !!loadUserFromStorage(),
  user: loadUserFromStorage(),
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
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