import { useState } from 'react';
import useAuthenticate from './useAuthenticateUser';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveUser } from '../store/userSlice';

const LoginButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    emailID: '',
    password: '',
  });
  const [login, setLogin] = useState(false);

  const startLogin = () => setLogin(true);
  const stopLogin = () => setLogin(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const { error, data } = useAuthenticate(credentials, login, stopLogin);
  if (!error && data) {
    dispatch(saveUser(data));
    navigate('/');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    startLogin();
  };

  return (
    <>
      <button
        className='btn btn-wide rounded-full text-xl font-bold text-black bg-white hover:bg-white'
        onClick={() => document.getElementById('my_modal_3').showModal()}
      >
        Log in
      </button>

      <dialog id='my_modal_3' className='modal'>
        <div className='modal-box'>
          <form onSubmit={handleSubmit}>
            {/* if there is a button in form, it will close the modal */}
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              ✕
            </button>

            <div className='text-center'>
              <div className='w-10 rounded-full mx-auto'>
                <img alt='DevTinder Logo' src='/code.png' />
              </div>
              <br />
              <h3 className='text-2xl font-bold'>Get Started</h3>
              <div className='mt-4 w-3/4 mx-auto'>
                <label className='input input-bordered flex items-center gap-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 16 16'
                    fill='currentColor'
                    className='h-4 w-4 opacity-70'
                  >
                    <path d='M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z' />
                    <path d='M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z' />
                  </svg>
                  <input
                    type='text'
                    className='grow'
                    placeholder='Email ID'
                    name='emailID'
                    value={credentials.emailID}
                    onChange={handleFormChange}
                  />
                </label>

                <label className='input input-bordered flex items-center gap-2 mt-4'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 16 16'
                    fill='currentColor'
                    className='h-4 w-4 opacity-70'
                  >
                    <path
                      fillRule='evenodd'
                      d='M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <input
                    type='password'
                    className='grow'
                    placeholder='Password'
                    name='password'
                    value={credentials.password}
                    onChange={handleFormChange}
                  />
                </label>
                <button
                  type='submit'
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSubmit();
                  }}
                  className='mt-4 btn w-1/2 rounded-full text-xl font-bold text-black bg-white hover:bg-white'
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default LoginButton;
