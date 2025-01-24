import down from './../assets/down.png';
import defaultUserIcon from './../assets/defaultUserIcon.png';
import { Link, useParams } from 'react-router-dom';
import accept from './../assets/accept.png';
import cross from './../assets/cross.png';
import refresh from './../assets/refreshIcon.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const DetailedFeedCard = () => {
  const { profileId } = useParams();
  const [userDetails, setUserDetails] = useState({
    fetching: false,
    error: false,
    errorMessage: undefined,
    data: undefined,
  });

  console.log('profileID: ', profileId);

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
    <>
      {userDetails.data && (
        <div className='w-full h-screen mx-auto flex justify-center overflow-y-scroll'>
          <div className='w-[26rem] h-[82vh] sm:h-[98vh] bg-base-300 relative overflow-y-auto mb-1 rounded-b-xl shadow-lg shadow-indigo-300/40'>
            <div className='w-full h-20 bg-base-300 text-white flex justify-between py-2 px-4 sticky top-0'>
              <p className='text-4xl font-bold my-2'>
                {userDetails.data.firstName}{' '}
                <span className='text-3xl font-semibold'>29</span>
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
              <div className='h-48 bg-base-300 mt-4 my-2 rounded-2xl p-6 overflow-y-scroll'>
                <p className='text-2xl font-medium mb-2'>Essentials</p>
                {userDetails.data.about && (
                  <p className='text-base font-medium text-wrap'>
                    {`${userDetails.data.about.substring(0, 150)}`}
                  </p>
                )}
              </div>
              <div className='h-48 bg-base-300 mb-2 rounded-2xl p-6 overflow-y-scroll'>
                <p className='text-2xl font-medium mb-2'> About me</p>
                {userDetails.data.about && (
                  <p className='text-base font-medium text-wrap'>
                    {`${userDetails.data.about.substring(0, 150)}`}
                  </p>
                )}
              </div>
              <div className='h-52 bg-base-300 rounded-2xl p-6 overflow-y-scroll'>
                <p className='text-2xl font-medium mb-2'>Skills</p>
                <div className='my-4'>
                  {userDetails.data.skills &&
                    userDetails.data.skills.map((element, index) => (
                      <span
                        key={index}
                        className='p-2 rounded-full bg-slate-400 cursor-pointer mx-1'
                      >
                        {element}
                      </span>
                    ))}
                </div>
              </div>
              <div className='my-10 gap-4 mb-32'>
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
          <div className='w-96 h-auto fixed bottom-20 sm:bottom-10 flex justify-around items-center'>
            <button
              className='w-20 h-20 rounded-full bg-base-100 text-white hover:scale-125 hover:bg-base-200 hover:text-white'
              title='Pass'
            >
              <img src={cross} className='w-10 mx-auto' />
            </button>
            <button
              className='w-16 h-16 rounded-full bg-base-100 text-white hover:scale-125 hover:bg-base-200 hover:text-white'
              title='Refresh'
            >
              <img src={refresh} className='w-10 mx-auto p-1' />
            </button>
            <button
              className='w-20 h-20 rounded-full bg-base-100 text-white hover:scale-125 hover:bg-base-200 hover:text-white'
              title='Send Request'
            >
              <img src={accept} className='w-10 mx-auto' />
            </button>
          </div>
        </div>
      )}
      {userDetails.error && <div>Error</div>}
      {userDetails.fetching && <div>fetching</div>}
    </>
  );
};

export default DetailedFeedCard;
