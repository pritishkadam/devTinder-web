import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import defaultUserIcon from './../assets/defaultUserIcon.png';
import message from './../assets/message.png';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MatchList = () => {
  const navigate = useNavigate();
  const connections = useSelector((store) => store.connection.connections);
  const [matches, setMatches] = useState({
    fetching: false,
    error: false,
    errorMessage: undefined,
    data: undefined,
  });
  const API_URL = BASE_URL + '/user/connections';

  const fetchConnections = async () => {
    try {
      setMatches({
        fetching: true,
        error: false,
        errorMessage: undefined,
        data: undefined,
      });
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
    if (connections) {
      setMatches({
        fetching: false,
        error: false,
        errorMessage: undefined,
        data: connections,
      });
    } else {
      fetchConnections();
    }
  }, [connections]);

  const handleRedirect = (userId) => {
    if (userId) {
      navigate('/matches/' + userId);
    }
  };

  const handleMessageRedirect = (userId) => {
    if (userId) {
      navigate('/message/' + userId);
    }
  };

  return (
    <div className='my-2 py-2'>
      {matches.data &&
        matches.data.map((match) => (
          <div
            key={match._id}
            onClick={() => handleRedirect(match._id)}
            className='w-full h-24 px-2 border-2 border-slate-800 cursor-pointer rounded-xl relative mb-2 flex items-center bg-base-300'
          >
            <img
              src={match.photoUrl}
              className='w-20 h-20 rounded-full border border-slate-800'
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = defaultUserIcon;
              }}
            />
            <div className='w-full h-full py-2 mx-2 flex gap-2 justify-between'>
              <div className='w-48 flex flex-col'>
                <h2 className='text-xl'>
                  <span className='font-semibold'>
                    {match.firstName}, {match.age}
                  </span>
                </h2>
                <p>
                  {match.about && match.about.length <= 50
                    ? match.about
                    : match.about.substring(0, 50) + ' ...'}
                </p>
              </div>
              <div className='flex justify-center items-center'>
                <button
                  className='w-10 h-10 border border-slate-700 rounded-full bg-slate-800 text-white hover:scale-125 hover:bg-base-200 hover:text-white'
                  title='Message'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMessageRedirect(match._id);
                  }}
                >
                  <img src={message} className='w-5 mx-auto' />
                </button>
              </div>
            </div>
          </div>
        ))}
      {matches.data && matches.data.length === 0 && (
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
      {matches.error && (
        <div>
          <p className='h-96 mx-auto text-center'>
            <p className='text-xl font-semibold my-4'>
              Error in fetching Connections!
            </p>
          </p>
        </div>
      )}
    </div>
  );
};

export default MatchList;
