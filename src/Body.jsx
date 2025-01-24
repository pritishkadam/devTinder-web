import SideBar from './components/SideBar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from './utils/constants';
import { saveUser } from './store/userSlice';
import { useEffect } from 'react';
import GuestView from './components/GuestView/GuestView';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((store) => store.user.userDetails);
  const isLoggedIn = userData ? true : false;

  const fetchUser = async () => {
    if (userData) {
      return true;
    }
    try {
      const { error, data } = await axios.get(BASE_URL + '/profile/view', {
        withCredentials: true,
      });
      if (error) {
        throw new Error(error);
      }
      dispatch(saveUser(data.data));
      navigate('/explore');
    } catch (error) {
      if (error.status === 401) {
        navigate('/');
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {!isLoggedIn && <GuestView />}
      {isLoggedIn && (
        <div className='flex'>
          <SideBar />
          <div className='w-full'>
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default Body;
