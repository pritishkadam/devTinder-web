import MatchList from './Matches/MatchList';
import Messages from './Messages/Messages';
import { useDispatch, useSelector } from 'react-redux';
import defaultUserIcon from './../assets/defaultUserIcon.png';
import messageIcon from './../assets/message.png';
import connectionIcon from './../assets/connection.png';
import requestIcon from './../assets/requests.png';
import exploreIcon from './../assets/explore.png';
import logoutIcon from './../assets/logout.png';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { removeUser } from '../store/userSlice';
import Requests from './Requests/Requests';
import { createSocketConnection } from '../utils/socket';
import LogoutConfirmation from './User/LogoutConfirmation';
import { useState } from 'react';

const SideBar = () => {
  const userData = useSelector((store) => store.user.userDetails);
  const { firstName, photoUrl } = userData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showLogout, setShowLogout] = useState(false);

  const handleCancel = () => {
    setShowLogout(false);
  };

  const handleLogout = async () => {
    try {
      const API_URL = BASE_URL + '/auth/logout';
      const { error, data } = await axios.post(API_URL, null, {
        withCredentials: true,
      });
      if (error || data.error) {
        throw new Error('Something went wrong!');
      }
      setShowLogout(false);
      localStorage.removeItem('token');
      dispatch(removeUser());
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className='hidden md:block md:w-[28rem] md:h-screen md:bg-base-300 md:overflow-y-auto'>
        <header className='w-full h-20 bg-gradient-to-tr from-[#fd267a] to-[#ff6036] flex justify-between items-center px-2 pr-4 sticky top-0 z-10'>
          <Link
            to={`/profile`}
            className='h-10 border-none rounded-full bg-transparent hover:bg-[#111418cc] px-1 py-1'
          >
            <div className='flex justify-center items-center gap-1 text-black p-0'>
              <img
                alt='DevTinder Logo'
                src={photoUrl}
                className='w-7 h-full rounded-full'
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = defaultUserIcon;
                }}
              />
              <span className='text-base mx-2 text-white font-semibold'>
                {firstName}
              </span>
            </div>
          </Link>
          <div className='flex gap-4'>
            <Link
              to={'/explore'}
              title='Explore'
              className='w-8 h-8 rounded-full border bg-slate-200 cursor-pointer hover:border-slate-700'
            >
              <img
                alt='explore'
                src={exploreIcon}
                className='w-full rounded-full p-1'
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = defaultUserIcon;
                }}
              />
            </Link>
            <button
              onClick={() => setShowLogout(true)}
              title='Logout'
              className='w-8 h-8 rounded-full border bg-slate-200 cursor-pointer hover:border-slate-700'
            >
              <img
                alt='logout'
                src={logoutIcon}
                className='w-full rounded-full p-1'
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = defaultUserIcon;
                }}
              />
            </button>
          </div>
        </header>
        <div role='tablist' className='tabs tabs-bordered pt-3 relative z-0'>
          <input
            type='radio'
            name='my_tabs_1'
            role='tab'
            className='tab mr-2 text-md font-bold border-0 border-b-red-600 mx-2'
            aria-label='Matches'
            defaultChecked
          />
          <div role='tabpanel' className='tab-content pt-3'>
            <MatchList />
          </div>

          <input
            type='radio'
            name='my_tabs_1'
            role='tab'
            className='tab mr-2 text-md font-bold border-0 border-b-red-600'
            aria-label='Requests'
          />
          <div role='tabpanel' className='tab-content pt-3'>
            <Requests />
          </div>
        </div>
      </div>
      <div className='md:hidden w-full h-10 z-10 bg-gradient-to-tr from-[#fd267a] to-[#ff6036] fixed bottom-0 flex justify-evenly items-center'>
        <Link
          to={'/explore'}
          className='w-8 h-8 rounded-full border bg-slate-200 cursor-pointer hover:border-black'
        >
          <img
            alt='explore'
            src={exploreIcon}
            className='w-full rounded-full p-1'
            title='Explore'
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = defaultUserIcon;
            }}
          />
        </Link>
        <Link
          to={'/requests'}
          className='w-8 h-8 rounded-full border bg-slate-200 cursor-pointer  hover:border-black'
          title='Requests'
        >
          <img
            alt='requests'
            src={requestIcon}
            className='w-full rounded-full p-1'
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = defaultUserIcon;
            }}
          />
        </Link>
        <Link
          to={'/matches'}
          className='w-8 h-8 rounded-full border bg-slate-200 cursor-pointer hover:border-black'
          title='Connections'
        >
          <img
            alt='connection'
            src={connectionIcon}
            className='w-full rounded-full'
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = defaultUserIcon;
            }}
          />
        </Link>
        <Link
          to={'/profile'}
          className='w-8 h-8 rounded-full border bg-slate-200 cursor-pointer hover:border-black'
          title='Profile'
        >
          <img
            alt='profile-photo'
            src={photoUrl}
            className='w-8 h-8 rounded-full'
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = defaultUserIcon;
            }}
          />
        </Link>
        <button
          onClick={handleLogout}
          title='Logout'
          className='w-8 h-8 rounded-full border bg-slate-200 cursor-pointer hover:border-black'
        >
          <img
            alt='logout'
            src={logoutIcon}
            className='w-full rounded-full p-1'
          />
        </button>
      </div>
      <LogoutConfirmation
        show={showLogout}
        onConfirm={handleLogout}
        onCancel={handleCancel}
      />
    </>
  );
};

export default SideBar;
