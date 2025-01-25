import { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import defaultUserIcon from './../assets/defaultUserIcon.png';
import accept from './../assets/accept.png';
import cross from './../assets/cross.png';

const Requests = () => {
  const [requests, setRequests] = useState({
    fetching: false,
    error: false,
    errorMessage: undefined,
    data: undefined,
  });
  const API_URL = BASE_URL + '/user/requests/received';

  const fetchRequests = async () => {
    try {
      const { error, data } = await axios.post(API_URL, null, {
        withCredentials: true,
      });
      if (error || data.error) {
        throw new Error(data.errorMessage);
      }
      setRequests({ fetching: false, error: false, data: data.data });
    } catch (e) {
      setRequests({
        fetching: false,
        error: true,
        errorMessage: e.message,
        data: undefined,
      });
    }
  };

  useEffect(() => {
    setRequests({
      fetching: true,
      error: false,
      errorMessage: undefined,
      data: undefined,
    });
    fetchRequests();
  }, []);

  return (
    <div className='my-2 py-2'>
      {requests.data &&
        requests.data.map((match) => (
          <div
            key={match._id}
            className='w-full h-24 border-2 border-slate-800 cursor-pointer rounded-xl relative mb-2 flex items-center bg-base-300'
          >
            <img
              src={match?.sender?.photoUrl}
              className='w-20 h-20 rounded-full border border-slate-800 mx-2'
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = defaultUserIcon;
              }}
            />
            <div className='w-full h-full py-2 flex gap-2 justify-between'>
              <div className='w-40 flex flex-col'>
                <h2 className='text-xl mx-1'>
                  <span className='font-semibold'>
                    {match?.sender?.firstName}, {match?.sender?.age}
                  </span>
                </h2>
                <p className='overflow-hidden'>{match?.sender?.about}</p>
              </div>
              <div className='w-24 mx-2 flex items-center gap-4'>
                <button
                  className='w-10 h-10 rounded-full bg-slate-800 text-white hover:scale-125 hover:bg-base-200 hover:text-white'
                  title='Reject'
                >
                  <img src={cross} className='w-5 mx-auto' />
                </button>
                <button
                  className='w-10 h-10 rounded-full bg-slate-800 text-white hover:scale-125 hover:bg-base-200 hover:text-white'
                  title='Accept'
                >
                  <img src={accept} className='w-5 mx-auto' />
                </button>
              </div>
            </div>
          </div>
        ))}
      {requests.data && requests.data.length === 0 && (
        <div>
          <div className='w-32 h-40 mx-auto my-4 rounded-xl bg-gradient-to-tr from-[#fd267a] to-[#ff6036]' />
          <p className='h-96 mx-auto text-center'>
            <p className='text-3xl font-semibold my-4'>Requests!</p>
            <p className='w-64 text-xl mx-auto'>
              Requests will start appearing here once someone sends you request!
            </p>
          </p>
        </div>
      )}
    </div>
  );
};

export default Requests;
