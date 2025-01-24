import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_URL } from './../utils/constants';

export default function useAuthenticate(credentials, login, stopLogin) {
  const API_URL = BASE_URL + '/auth/login';
  const [response, setResponse] = useState({
    fetching: false,
    error: false,
    errorMessage: undefined,
    data: undefined,
  });
  useEffect(() => {
    const authenticateUser = async () => {
      try {
        stopLogin();
        setResponse({
          fetching: true,
          error: false,
          errorMessage: undefined,
          data: undefined,
        });

        const { error, errorMessage, data } = await axios.post(
          API_URL,
          credentials,
          {
            withCredentials: true,
          }
        );
        if (error) {
          throw new Error(errorMessage);
        }
        setResponse({
          fetching: false,
          error: false,
          errorMessage: undefined,
          data: data.data,
        });
      } catch (e) {
        setResponse({
          fetching: false,
          error: true,
          errorMessage: e.message,
          data: undefined,
        });
      }
    };

    if (login) {
      authenticateUser();
    }
  }, [login]);
  return response;
}
