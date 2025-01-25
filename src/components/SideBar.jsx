import MatchList from './MatchList';
import Messages from './Messages';
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
import Requests from './Requests';

const SideBar = () => {
  const userData = useSelector((store) => store.user.userDetails);
  const { firstName, photoUrl } = userData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const API_URL = BASE_URL + '/auth/logout';
      const { error, data } = await axios.post(API_URL, null, {
        withCredentials: true,
      });
      if (error || data.error) {
        throw new Error('Something went wrong!');
      }
      localStorage.removeItem('token');
      dispatch(removeUser());
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className='hidden md:block md:w-[35rem] md:h-screen md:bg-base-300 md:overflow-y-auto'>
        <header className='w-full py-6 bg-gradient-to-tr from-[#fd267a] to-[#ff6036] flex justify-between items-center px-4 sticky top-0 z-10'>
          <Link
            to={`/profile`}
            className='btn border-none rounded-full bg-transparent hover:bg-base-300 px-1'
          >
            <div className='flex justify-center items-center gap-2 text-black p-0'>
              <img
                alt='DevTinder Logo'
                src={photoUrl}
                className='w-10 rounded-full'
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = defaultUserIcon;
                }}
              />
              <span className='text-xl mx-2 text-white'>{firstName}</span>
            </div>
          </Link>
          <div className='flex gap-4'>
            <Link
              to={'/explore'}
              title='Explore'
              className='w-10 h-10 rounded-full border bg-slate-200 cursor-pointer'
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
              onClick={handleLogout}
              title='Logout'
              className='w-10 h-10 rounded-full border bg-slate-200 cursor-pointer'
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
        <div
          role='tablist'
          className='tabs tabs-bordered pt-3 relative z-0'
        >
          <input
            type='radio'
            name='my_tabs_1'
            role='tab'
            className='tab mr-2 text-xl font-bold border-0 border-b-red-600'
            aria-label='Matches'
            defaultChecked
          />
          <div role='tabpanel' className='tab-content pt-3 pr-2'>
            <MatchList />
          </div>

          <input
            type='radio'
            name='my_tabs_1'
            role='tab'
            className='tab mr-2 text-xl font-bold border-0 border-b-red-600'
            aria-label='Messages'
          />
          <div role='tabpanel' className='tab-content pt-3 pr-2'>
            <Messages />
          </div>

          <input
            type='radio'
            name='my_tabs_1'
            role='tab'
            className='tab mr-2 text-xl font-bold border-0 border-b-red-600'
            aria-label='Requests'
          />
          <div role='tabpanel' className='tab-content pt-3 pr-2'>
            <Requests />
          </div>
        </div>
      </div>
      <div className='md:hidden w-full h-16 z-10 bg-gradient-to-tr from-[#fd267a] to-[#ff6036] fixed bottom-0 flex justify-evenly items-center'>
        <Link
          to={'/explore'}
          className='w-10 h-10 rounded-full border bg-slate-200 cursor-pointer'
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
          className='w-10 h-10 rounded-full border bg-slate-200 cursor-pointer'
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
          to={'/connections'}
          className='w-10 h-10 rounded-full border bg-slate-200 cursor-pointer'
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
          to={'/messages'}
          className='w-10 h-10 rounded-full border bg-slate-200 cursor-pointer'
          title='Messages'
        >
          <img
            alt='messages'
            src={messageIcon}
            className='w-full rounded-full'
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = defaultUserIcon;
            }}
          />
        </Link>
        <Link
          to={'/profile'}
          className='w-10 h-10 rounded-full border bg-slate-200 cursor-pointer'
          title='Profile'
        >
          <img
            alt='profile-photo'
            src={photoUrl}
            className='w-full rounded-full'
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = defaultUserIcon;
            }}
          />
        </Link>
      </div>
    </>
  );
};

export default SideBar;
