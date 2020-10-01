import React from 'react';
import { useContext } from 'react';
//import { AuthContext } from './AuthContext';

export function User({ children }) {
  //const { isAuthenticated, user } = useContext(AuthContext);
  return children({});//children({ isAuthenticated, role: user.role })
}

export default User;