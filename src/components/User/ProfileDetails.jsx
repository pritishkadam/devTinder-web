import down from './../../assets/down.png';
import defaultUserIcon from './../../assets/defaultUserIcon.png';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from './../../utils/constants';
import FeedCardError from '../Explore/FeedCardError';
import FeedCardSkeleton from '../Explore/FeedCardSkeleton';

const ProfileDetails = () => {
  const { profileId } = useParams();
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

  useEffect(() => {
    setUserDetails({
      error: false,
      fetching: true,
      errorMessage: undefined,
      data: undefined,
    });
    fetchUserDetails();
  }, []);

  return (
    <div className='w-full h-screen mx-auto flex justify-center overflow-y-scroll'>
      {userDetails.data && (
        <div className='w-[22rem] h-[85vh] sm:h-[90vh] bg-base-300 relative overflow-y-auto mb-1 rounded-xl shadow-lg shadow-indigo-300/40'>
          <div className='w-full h-16 bg-black text-white flex justify-between py-2 px-4 sticky top-0'>
            <p className='text-4xl font-bold'>
              {userDetails?.data?.firstName}
              {userDetails?.data?.age && (
                <span className='text-3xl font-semibold'>
                  , {userDetails.data.age}
                </span>
              )}
            </p>
            <Link
              to={`/profile`}
              className='w-8 h-8 rounded-full border bg-black hover:scale-110 my-auto p-1'
            >
              <img src={down} className='w-8 object-contain' />
            </Link>
          </div>
          <div className='w-full h-auto bg-black'>
            <div className='bg-base-300 h-[80%] mb-2'>
              <img
                src={userDetails.data.photoUrl}
                className='h-80 mx-auto'
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = defaultUserIcon;
                }}
              />
            </div>
            <div className='h-48 bg-base-300 mt-4 my-2 rounded-2xl p-6 overflow-y-scroll mx-1'>
              <p className='text-2xl font-medium mb-2'>Essentials</p>
              {userDetails.data.firstName && userDetails.data.lastName && (
                <p className='text-base font-medium text-wrap'>
                  Name:{' '}
                  {`${userDetails.data.firstName} ${userDetails.data.lastName}`}
                </p>
              )}
              {userDetails.data.age && (
                <p className='text-base font-medium text-wrap'>
                  Age: {`${userDetails.data.age}`}
                </p>
              )}
              {userDetails.data.gender && (
                <p className='text-base font-medium text-wrap'>
                  Gender: {`${userDetails.data.gender}`}
                </p>
              )}
              {userDetails.data.role && (
                <p className='text-base font-medium text-wrap'>
                  Role: {`${userDetails.data.role}`}
                </p>
              )}
            </div>

            {userDetails.data.about && (
              <div className='h-48 bg-base-300 mb-2 rounded-2xl p-6 overflow-y-scroll mx-1'>
                <p className='text-2xl font-medium mb-2'> About me</p>
                <p className='text-base font-medium text-wrap'>
                  {`${userDetails.data.about.substring(0, 150)}`}
                </p>
              </div>
            )}
            <div className='h-52 bg-base-300 rounded-2xl p-6 overflow-y-scroll mx-1'>
              <p className='text-2xl font-medium mb-2'>Skills</p>
              <div className='my-4 flex flex-wrap overflow-scroll'>
                {userDetails.data.skills &&
                  userDetails.data.skills.map((element, index) => (
                    <span
                      key={index}
                      className='p-2 rounded-full bg-slate-400 cursor-pointer m-1'
                    >
                      {element}
                    </span>
                  ))}
              </div>
            </div>
            <br />
          </div>
        </div>
      )}
      {userDetails.error && <FeedCardError />}
      {userDetails.fetching && <FeedCardSkeleton />}
    </div>
  );
};

export default ProfileDetails;
