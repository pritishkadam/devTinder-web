import { useState } from 'react';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';

const SignUpButton = (props) => {
  const { buttonType } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const [modalType, setModalType] = useState(buttonType);

  const openModal = () => setOpenDialog(true);
  const closeModal = () => {
    setModalType(buttonType);
    setOpenDialog(false);
  };

  return (
    <>
      <button
        className={
          'btn btn-wide sm:w-56 rounded-full text-xl font-bold text-black bg-white hover:bg-white'
        }
        onClick={() => {
          openModal();
        }}
      >
        {buttonType === 'register' ? 'Create Account' : 'Login'}
      </button>

      {openDialog && (
        <div
          className='fixed inset-0 bg-slate-900 bg-opacity-50 flex justify-center items-center z-40'
          onClick={closeModal}
        >
          <div
            className='bg-gray-900 rounded-lg shadow-lg w-[30rem] p-6 space-y-4 text-center relative'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
              onClick={closeModal}
            >
              ✕
            </button>

            {modalType === 'register' && (
              <>
                <SignUpForm closeModal={closeModal} />
                <p
                  className='my-2 pt-2 hover:cursor-pointer hover:text-slate-300 border-t-2 border-slate-500'
                  onClick={() => {
                    setModalType('login');
                  }}
                >
                  Already Registered? Try to Login
                </p>
              </>
            )}
            {modalType === 'login' && (
              <>
                <LoginForm closeModal={closeModal} />
                <p
                  className='my-2 pt-2 hover:cursor-pointer hover:text-slate-300 border-t-2 border-slate-500'
                  onClick={() => {
                    setModalType('register');
                  }}
                >
                  If not registered already, Register Here
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SignUpButton;
