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
import EmptyFeedCard from './EmptyFeedCard';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed, removeFeed } from '../store/feedSlice';

const buttonAction = {
  INTERESTED: 'interested',
  REFRESH: 'refresh',
  IGNORED: 'ignored',
};

const Explore = () => {
  const feed = useSelector((store) => store.feed.feedData);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const [profileList, setProfileList] = useState({
    fetching: false,
    error: false,
  });

  const fetchUserProfiles = async () => {
    setProfileList({
      fetching: true,
      error: false,
    });
    try {
      const API_URL = BASE_URL + '/user/feed';
      const { error, data } = await axios.get(API_URL, {
        withCredentials: true,
      });
      if (error || data.error) {
        throw new Error(data.errorMessage);
      }
      setProfileList({
        fetching: false,
        error: false,
      });
      dispatch(addFeed(data.data));
    } catch (error) {
      setProfileList({
        fetching: false,
        error: true,
      });
    }
  };

  useEffect(() => {
    if (feed) {
      return;
    } else {
      fetchUserProfiles();
    }
  }, [feed]);

  const shuffleProfiles = () => {
    if (feed) {
      const data = [...feed];
      for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [data[i], data[j]] = [data[j], data[i]];
      }
      dispatch(addFeed(data));
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
      } else if (action === buttonAction.REFRESH) {
        shuffleProfiles();
      }
    }
  };

  return (
    <>
      <div className='w-full h-screen relative mx-auto flex justify-center overflow-y-scroll'>
        {feed && feed.length === 0 && <EmptyFeedCard />}
        {feed && feed.length !== 0 && (
          <>
            <FeedCard profile={feed[0]} />
            <div className='w-96 h-auto fixed bottom-20 sm:bottom-10 flex justify-around items-center'>
              <button
                className='w-20 h-20 border border-slate-700 rounded-full bg-base-100 text-white hover:scale-125 hover:bg-base-200 hover:text-white'
                title='Pass'
                onClick={() => {
                  handleAction(feed[0]._id, buttonAction.IGNORED);
                }}
              >
                <img src={cross} className='w-10 mx-auto' />
              </button>
              <button
                className='w-16 h-16 border border-slate-700 rounded-full bg-base-100 text-white hover:scale-125 hover:bg-base-200 hover:text-white'
                title='Refresh'
                onClick={() => {
                  handleAction(feed[0]._id, buttonAction.REFRESH);
                }}
              >
                <img src={refresh} className='w-10 mx-auto p-1' />
              </button>
              <button
                className='w-20 h-20 border border-slate-700 rounded-full bg-base-100 text-white hover:scale-125 hover:bg-base-200 hover:text-white'
                title='Send Request'
                onClick={() => {
                  handleAction(feed[0]._id, buttonAction.INTERESTED);
                }}
              >
                <img src={accept} className='w-10 mx-auto' />
              </button>
            </div>
          </>
        )}
        {profileList.error && <FeedCardError />}
        {profileList.fetching && <FeedCardSkeleton />}
        {errorMessage && (
          <AlertComponent message={errorMessage} alertType={'error'} />
        )}
      </div>
    </>
  );
};

export default Explore;
