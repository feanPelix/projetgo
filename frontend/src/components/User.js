import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../App';

export function User({ children }) {
  const { isAuthenticated, user } = useContext(AuthContext);
  return children({ isAuthenticated, role: user.role })
}

export default User;