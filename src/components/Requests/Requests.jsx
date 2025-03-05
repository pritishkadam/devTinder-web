import { useEffect, useState } from 'react';
import { BASE_URL } from '../../utils/constants';
import axios from 'axios';
import defaultUserIcon from './../../assets/defaultUserIcon.png';
import accept from './../../assets/accept.png';
import cross from './../../assets/cross.png';
import timeSince from '../../utils/timeSince';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addRequestData, removeRequestData } from '../../store/requestSlice';
import AlertComponent from '../AlertComponent';
import { alertTypes } from '../../enums/alerts';
import { addConnection } from '../../store/connectionSlice';

const buttonAction = {
  ACCEPT: 'accepted',
  REJECT: 'rejected',
};

const Requests = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.request.receivedRequestDetails);
  const [requests, setRequests] = useState({
    fetching: false,
    error: false,
  });

  const [alert, setAlert] = useState('');

  const API_URL = BASE_URL + '/user/requests/received';

  const fetchRequests = async () => {
    try {
      setRequests({
        fetching: true,
        error: false,
      });
      const { error, data } = await axios.post(API_URL, null, {
        withCredentials: true,
      });
      if (error || data.error) {
        throw new Error(data.errorMessage);
      }
      setRequests({ fetching: false, error: false });
      dispatch(addRequestData(data.data));
    } catch (e) {
      setRequests({
        fetching: false,
        error: true,
      });
    }
  };

  useEffect(() => {
    if (userData) {
      return;
    } else {
      fetchRequests();
    }
  }, [userData]);

  const handleRedirect = (requestId, userId) => {
    if (userId) {
      navigate('/requests/' + userId);
    }
  };

  const updateConnectionRequest = async (requestId, action, senderData) => {
    try {
      const API_URL = `${BASE_URL}/request/review/${action}/${requestId}`;
      const { error, data } = await axios.post(API_URL, null, {
        withCredentials: true,
      });
      if (error || data.error) {
        throw new Error(data.errorMessage);
      }
      if (action === buttonAction.ACCEPT) {
        dispatch(addConnection(senderData));
      }
      dispatch(removeRequestData({ id: requestId }));
      // setRequests({
      //   fetching: false,
      //   error: false,
      //   errorMessage: undefined,
      //   data: userData,
      // });
    } catch (error) {
      setAlert('Something went wrong!');
    }
  };

  useEffect(() => {
    setTimeout(() => {}, 3000);
    if (alert) setAlert('');
  }, [alert]);

  return (
    <div className='my-5 sm:my-2 py-2 mx-1'>
      {userData &&
        userData.map((match) => (
          <div
            key={match._id}
            onClick={() => handleRedirect(match._id, match?.sender?._id)}
            className='w-full h-20 px-2 border-2 border-slate-800 cursor-pointer rounded-xl relative mb-2 flex items-center bg-base-300'
          >
            <img
              src={match?.sender?.photoUrl}
              className='w-14 h-14 rounded-full border border-slate-800'
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = defaultUserIcon;
              }}
            />
            <div className='w-full h-full py-2 mx-2 flex gap-2 justify-between'>
              <div className='w-3/4 flex flex-col justify-center'>
                <h2 className='text-base'>
                  <span className='font-semibold'>
                    {match?.sender?.firstName}, {match?.sender?.age}
                  </span>
                </h2>
                <p className='text-xs'>{timeSince(match?.createdAt)}</p>
              </div>
              <div className='w-24 flex items-center gap-4'>
                <button
                  className='w-8 h-8 border border-slate-700 rounded-full bg-slate-800 text-white hover:scale-125 hover:bg-base-200 hover:text-white'
                  title='Reject'
                  onClick={(e) => {
                    e.stopPropagation();
                    updateConnectionRequest(
                      match._id,
                      buttonAction.REJECT,
                      match?.sender
                    );
                  }}
                >
                  <img src={cross} className='w-5 mx-auto' />
                </button>
                <button
                  className='w-8 h-8 border border-slate-700 rounded-full bg-slate-800 text-white hover:scale-125 hover:bg-base-200 hover:text-white'
                  title='Accept'
                  onClick={(e) => {
                    e.stopPropagation();
                    updateConnectionRequest(
                      match._id,
                      buttonAction.ACCEPT,
                      match?.sender
                    );
                  }}
                >
                  <img src={accept} className='w-5 mx-auto' />
                </button>
              </div>
            </div>
          </div>
        ))}
      {userData && userData.length === 0 && (
        <div>
          <div className='w-32 h-40 mx-auto my-4 rounded-xl bg-gradient-to-tr from-[#fd267a] to-[#ff6036]' />
          <p className='h-96 mx-auto text-center'>
            <p className='text-2xl font-semibold my-4'>Requests!</p>
            <p className='w-64 text-base mx-auto text-slate-400'>
              Requests will start appearing here once someone sends you request!
            </p>
          </p>
        </div>
      )}
      {requests.error && (
        <div>
          <p className='h-96 mx-auto text-center'>
            <p className='text-xl font-semibold my-4'>
              Error in fetching Requests!
            </p>
          </p>
        </div>
      )}
      {alert && <AlertComponent alertType={alertTypes.ERROR} message={alert} />}
    </div>
  );
};

export default Requests;
