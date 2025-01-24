import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import defaultUserIcon from './../assets/defaultUserIcon.png';

const MatchList = () => {
  const [matches, setMatches] = useState({
    fetching: false,
    error: false,
    errorMessage: undefined,
    data: undefined,
  });
  const API_URL = BASE_URL + '/user/connections';

  const fetchConnections = async () => {
    try {
      const { error, data } = await axios.post(API_URL, null, {
        withCredentials: true,
      });
      if (error || data.error) {
        throw new Error(data.errorMessage);
      }
      setMatches({ fetching: false, error: false, data: data.data });
    } catch (e) {
      setMatches({
        fetching: false,
        error: true,
        errorMessage: e.message,
        data: undefined,
      });
    }
  };

  useEffect(() => {
    setMatches({
      fetching: true,
      error: false,
      errorMessage: undefined,
      data: undefined,
    });
    fetchConnections();
  }, []);

  return (
    <div className='my-2 py-2'>
      {matches.data &&
        matches.data.map((match) => (
          <div
            key={match._id}
            className='w-32 h-40 border-4 rounded-xl relative'
          >
            <img
              src={match.photoUrl}
              className='h-full rounded-2xl'
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = defaultUserIcon;
              }}
            />
            <h2 className='absolute bottom-2 mx-1'>{match.firstName}</h2>
          </div>
        ))}
      {(matches.data !== undefined) & (matches?.data?.length === 0) && (
        <div>
          <div className='w-32 h-40 mx-auto my-4 rounded-xl bg-gradient-to-tr from-[#fd267a] to-[#ff6036]' />
          <p className='h-96 mx-auto text-center'>
            <p className='text-3xl font-semibold my-4'>Start Matching!</p>
            <p className='w-64 text-xl mx-auto'>
              Matches will start appearing here once the connection request is
              accepted from either side!
            </p>
          </p>
        </div>
      )}
    </div>
  );
};

export default MatchList;
