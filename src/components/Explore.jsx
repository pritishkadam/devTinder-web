import { useEffect, useState } from 'react';
import FeedCard from './FeedCard';
import accept from './../assets/accept.png';
import cross from './../assets/cross.png';
import refresh from './../assets/refreshIcon.png';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import FeedCardSkeleton from './FeedCardSkeleton';
import FeedCardError from './FeedCardError';
import AlertComponent from './AlertComponent';

const buttonAction = {
  INTERESTED: 'interested',
  REFRESH: 'refresh',
  IGNORED: 'ignored',
};

const Explore = () => {
  const [actionError, setActionError] = useState('Sample Text');
  const [profileList, setProfileList] = useState({
    fetching: false,
    error: false,
    errorMessage: undefined,
    data: undefined,
  });

  const fetchUserProfiles = async () => {
    try {
      const API_URL = BASE_URL + '/user/feed';
      const { error, data } = await axios.get(API_URL, {
        withCredentials: true,
      });
      if (error || data.error) {
        throw new Error(data.errorMessage);
      }
      setProfileList({ fetching: false, error: false, data: data.data });
    } catch (error) {
      setProfileList({
        fetching: false,
        error: true,
        errorMessage: error.message,
        data: undefined,
      });
    }
  };

  useEffect(() => {
    setProfileList({
      fetching: true,
      error: false,
      errorMessage: undefined,
      data: undefined,
    });
    fetchUserProfiles();
  }, []);

  const shuffleProfiles = () => {
    if (profileList.data) {
      const { data } = profileList;
      for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [data[i], data[j]] = [data[j], data[i]];
      }
      return data;
    }
    return profileList.data;
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
    } catch (error) {
      setActionError('Something went wrong! Try again in sometime.');
    }
  };

  useEffect(() => {
    if (actionError) {
      setTimeout(() => {
        setActionError('');
      }, [3000]);
    }
  }, [actionError]);

  const handleAction = (userId, action) => {
    if (action) {
      if (
        action === buttonAction.INTERESTED ||
        action === buttonAction.IGNORED
      ) {
        updateConnectionRequest(userId, action);
      } else if (action === buttonAction.REFRESH) {
        console.log('Reached Refresh section');
        const shuffledData = shuffleProfiles();
        setProfileList({ fetching: false, error: false, data: shuffledData });
        return true;
      }
    }
  };

  const handleAlert = () => setActionError('')

  return (
    <>
      {profileList.data &&
        profileList.data.map((profile, index) => (
          <div
            key={index}
            className='w-full h-screen relative mx-auto flex justify-center overflow-y-scroll'
          >
            <FeedCard key={profile._id} profile={profile} />
            <div className='w-96 h-auto fixed bottom-20 sm:bottom-10 flex justify-around items-center'>
              <button
                className='w-20 h-20 rounded-full bg-base-100 text-white hover:scale-125 hover:bg-base-200 hover:text-white'
                title='Pass'
                onClick={() => {
                  handleAction(profile._id, buttonAction.IGNORED);
                }}
              >
                <img src={cross} className='w-10 mx-auto' />
              </button>
              <button
                className='w-16 h-16 rounded-full bg-base-100 text-white hover:scale-125 hover:bg-base-200 hover:text-white'
                title='Refresh'
                onClick={() => {
                  handleAction(profile._id, buttonAction.REFRESH);
                }}
              >
                <img src={refresh} className='w-10 mx-auto p-1' />
              </button>
              <button
                className='w-20 h-20 rounded-full bg-base-100 text-white hover:scale-125 hover:bg-base-200 hover:text-white'
                title='Send Request'
                onClick={() => {
                  handleAction(profile._id, buttonAction.INTERESTED);
                }}
              >
                <img src={accept} className='w-10 mx-auto' />
              </button>
            </div>
          </div>
        ))}
      {profileList.error && (
        <div className='w-full h-screen relative mx-auto flex justify-center overflow-y-scroll'>
          <FeedCardError />
        </div>
      )}
      {profileList.fetching && <FeedCardSkeleton />}
      {actionError && <AlertComponent actionError={actionError} handleAlert={handleAlert} />}
    </>
  );
};

export default Explore;
