import down from './../../assets/down.png';
import defaultUserIcon from './../../assets/defaultUserIcon.png';
import { Link, useParams } from 'react-router-dom';
import accept from './../../assets/accept.png';
import cross from './../../assets/cross.png';
import refresh from './../../assets/refreshIcon.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../../store/feedSlice';
import AlertComponent from '../AlertComponent';
import FeedCardError from './FeedCardError';
import FeedCardSkeleton from './FeedCardSkeleton';

const buttonAction = {
  INTERESTED: 'interested',
  REFRESH: 'refresh',
  IGNORED: 'ignored',
};

const DetailedFeedCard = () => {
  const { profileId } = useParams();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');

  const [userDetails, setUserDetails] = useState({
    fetching: false,
    error: false,
    errorMessage: undefined,
    data: undefined,
  });

  const API_URL = `${BASE_URL}/user/profile/${profileId}`;
  const fetchUserDetails = async () => {
    try {
      const { error, data } = await axios.get(API_URL, {
        withCredentials: true,
      });
      if (error || data.error) {
        throw new Error(data.errorMessage);
      }
      setUserDetails({
        error: false,
        fetching: false,
        errorMessage: undefined,
        data: data.data,
      });
    } catch (error) {
      setUserDetails({
        error: true,
        fetching: false,
        errorMessage: error.message,
        data: undefined,
      });
    }
  };

  const updateConnectionRequest = async (userId, action) => {
    try {
      const API_URL = `${BASE_URL}/request/send/${action}/${userId}`;
      const { error, data } = await axios.post(API_URL, null, {
        withCredentials: true,
      });
      if (error || data.error) {
        throw new Error(data.errorMessage);
      }
      dispatch(removeFeed({ id: userId }));
    } catch (error) {
      setErrorMessage('Something went wrong! Try again in sometime.');
    }
  };

  useEffect(() => {
    setUserDetails({
      error: false,
      fetching: true,
      errorMessage: undefined,
      data: undefined,
    });
    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage('');
      }, [3000]);
    }
  }, [errorMessage]);

  const handleAction = (userId, action) => {
    if (action) {
      if (
        action === buttonAction.INTERESTED ||
        action === buttonAction.IGNORED
      ) {
        updateConnectionRequest(userId, action);
      }
    }
  };

  return (
    <>
      {userDetails.data && (
        <div className='w-full h-screen mx-auto flex justify-center overflow-y-scroll'>
          <div className='w-[22rem] h-[85vh] sm:h-[90vh] bg-base-300 relative overflow-y-auto mb-1 rounded-xl shadow-lg shadow-indigo-300/40'>
            <div className='w-full h-16 bg-black text-white flex justify-between py-2 px-4 sticky top-0'>
              <p className='text-4xl font-bold'>
                {userDetails.data.firstName}
                {userDetails?.data?.age && (
                  <span className='text-3xl font-semibold'>
                    , {userDetails.data.age}
                  </span>
                )}
              </p>
              <Link
                to={`/explore`}
                className='w-8 h-8 rounded-full border bg-black hover:scale-110 my-auto px-1 py-1'
              >
                <img src={down} className='w-8 object-contain' />
              </Link>
            </div>
            <div className='w-full h-auto bg-black'>
              <div className='bg-base-300 h-[80%]'>
                <img
                  src={userDetails.data.photoUrl}
                  className='h-full'
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = defaultUserIcon;
                  }}
                />
              </div>
              {userDetails?.data?.about && (
                <div className='h-48 bg-base-300 mt-4 my-2 rounded-2xl p-6 overflow-y-scroll mx-1'>
                  <p className='text-2xl font-medium mb-2'>Essentials</p>
                  <p className='text-base font-medium text-wrap'>
                    {`${userDetails.data.about.substring(0, 150)}`}
                  </p>
                </div>
              )}
              {userDetails.data.about && (
                <div className='h-48 bg-base-300 mb-2 rounded-2xl p-6 overflow-y-scroll mx-1'>
                  <p className='text-2xl font-medium mb-2'> About me</p>
                  <p className='text-base font-medium text-wrap'>
                    {`${userDetails.data.about.substring(0, 150)}`}
                  </p>
                </div>
              )}
              {userDetails.data.skills &&
                userDetails.data.skills.length !== 0 && (
                  <div className='h-52 bg-base-300 rounded-2xl p-6 overflow-y-scroll mx-1'>
                    <p className='text-2xl font-medium mb-2'>Skills</p>
                    <div className='my-4'>
                      {userDetails.data.skills.map((element, index) => (
                        <span
                          key={index}
                          className='p-2 rounded-full bg-slate-400 cursor-pointer mx-1'
                        >
                          {element}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              <div className='my-10 mx-4 gap-4'>
                <button className='btn w-full mb-6 text-lg font-medium'>
                  Block {userDetails.data.firstName}
                </button>
                <button className='btn w-full text-lg font-medium text-red-600'>
                  Report {userDetails.data.firstName}
                </button>
              </div>
              <br />
            </div>
          </div>
          <div className='w-[22rem] h-auto fixed bottom-16 sm:bottom-10 flex justify-around items-center'>
            <button
              className='w-16 h-16 border border-slate-700 rounded-full bg-base-100 text-white hover:scale-125 hover:bg-base-200 hover:text-white'
              title='Pass'
              onClick={() => {
                handleAction(profileId, buttonAction.IGNORED);
              }}
            >
              <img src={cross} className='w-8 mx-auto' />
            </button>
            <button
              className='w-16 h-16 border border-slate-700 rounded-full bg-base-100 text-white hover:scale-125 hover:bg-base-200 hover:text-white'
              title='Send Request'
              onClick={() => {
                handleAction(profileId, buttonAction.INTERESTED);
              }}
            >
              <img src={accept} className='w-8 mx-auto' />
            </button>
          </div>
        </div>
      )}
      {userDetails.error && <FeedCardError />}
      {userDetails.fetching && <FeedCardSkeleton />}
      {errorMessage && (
        <AlertComponent message={errorMessage} alertType={'error'} />
      )}
    </>
  );
};

export default DetailedFeedCard;
