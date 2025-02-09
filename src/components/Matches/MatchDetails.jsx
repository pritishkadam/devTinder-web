import defaultUserIcon from './../../assets/defaultUserIcon.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import FeedCardSkeleton from '../Explore/FeedCardSkeleton';
import FeedCardError from '../Explore/FeedCardError';
import EmptyFeedCard from '../Explore/EmptyFeedCard';

const buttonAction = {
  ACCEPT: 'accepted',
  REJECT: 'rejected',
};

const MatchDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    fetching: false,
    error: false,
    errorMessage: undefined,
    data: undefined,
  });

  const fetchUserDetails = async () => {
    const API_URL = `${BASE_URL}/user/profile/${userId}`;
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

  useEffect(() => {
    if (userId) {
      setUserDetails({
        error: false,
        fetching: true,
        errorMessage: undefined,
        data: undefined,
      });
      fetchUserDetails();
    } else if (!userId) {
      setUserDetails({
        error: false,
        fetching: false,
        errorMessage: undefined,
        data: [],
      });
    }
  }, [userId]);

  //   const updateConnectionRequest = async (action) => {
  //     try {
  //       if (!requestId) {
  //         throw new Error('Invalid Request Id');
  //       }
  //       const API_URL = `${BASE_URL}/request/review/${action}/${requestId}`;
  //       const { error, data } = await axios.post(API_URL, null, {
  //         withCredentials: true,
  //       });
  //       if (error || data.error) {
  //         throw new Error(data.errorMessage);
  //       }
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   };

  //   const handleAction = (action) => {
  //     if (action) {
  //       updateConnectionRequest(action);
  //     }
  //   };

  const handleMessageRedirect = (userId) => {
    if (userId) {
      navigate('/message/' + userId);
    }
  };

  return (
    <div className='w-full h-screen mx-auto flex justify-center overflow-y-scroll'>
      {userDetails.data && userDetails.data.length === 0 && <EmptyFeedCard />}
      {userDetails.data && (
        <div className='w-[26rem] h-[82vh] sm:h-[98vh] bg-base-300 relative overflow-y-auto mb-1 rounded-b-xl shadow-lg shadow-indigo-300/40'>
          <div className='w-full h-20 bg-base-300 text-white flex justify-between py-2 px-4 sticky top-0'>
            <p className='text-4xl font-bold my-2'>
              {userDetails.data.firstName}{' '}
              <span className='text-3xl font-semibold'>
                {userDetails.data.age}
              </span>
            </p>
          </div>
          <div className='w-full h-auto bg-black pb-20'>
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
            {userDetails.data.about && (
              <div className='h-48 bg-base-300 mt-4 my-2 rounded-2xl p-6 overflow-y-scroll'>
                <p className='text-2xl font-medium mb-2'>Essentials</p>
                <p className='text-base font-medium text-wrap'>
                  {`${userDetails.data.about.substring(0, 150)}`}
                </p>
              </div>
            )}
            {userDetails.data.about && (
              <div className='h-48 bg-base-300 mb-2 rounded-2xl p-6 overflow-y-scroll'>
                <p className='text-2xl font-medium mb-2'> About me</p>
                <p className='text-base font-medium text-wrap'>
                  {`${userDetails.data.about.substring(0, 150)}`}
                </p>
              </div>
            )}
            {userDetails.data.skills &&
              userDetails?.data?.skills?.length !== 0 && (
                <div className='h-52 bg-base-300 rounded-2xl p-6 overflow-y-scroll'>
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
            <br />
            <div className='mx-4 gap-4'>
              <button
                className='btn w-full mb-6 text-lg font-medium'
                title='Message'
                onClick={(e) => {
                  e.stopPropagation();
                  handleMessageRedirect(userDetails.data._id);
                }}
              >
                Message {userDetails.data.firstName}
              </button>
              <button className='btn w-full mb-6 text-lg font-medium text-red-600'>
                Block {userDetails.data.firstName}
              </button>
            </div>
          </div>
        </div>
      )}
      {userDetails.error && <FeedCardError />}
      {userDetails.fetching && <FeedCardSkeleton />}
    </div>
  );
};

export default MatchDetails;
