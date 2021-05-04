import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    console.log("user token is: " + userToken)
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  };

  const deleteToken = () => {
    sessionStorage.removeItem('token');
  }
  
  return {
    setToken: saveToken,
    deleteToken,
    token
  }
}