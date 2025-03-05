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
        className={`btn h-10 px-6 text-base rounded-full sm:text-lg font-bold text-black border-none bg-white hover:bg-white
            ${
              buttonType === 'register'
                ? ' bg-gradient-to-tr from-[#fd267a] to-[#ff6036] text-white'
                : ''
            }
        `}
        onClick={() => {
          openModal();
        }}
      >
        {buttonType === 'register' ? 'Create Account' : 'Login'}
      </button>

      {openDialog && (
        <div
          className='fixed inset-0 bg-slate-900 bg-opacity-50 flex justify-center items-center z-10'
          onClick={closeModal}
        >
          <div
            className='relative top-8 bg-gray-900 rounded-lg shadow-lg w-[30rem] overflow-scroll p-6 space-y-4 text-center'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
              onClick={closeModal}
            >
              ✕
            </button>

            {modalType === 'register' && (
              <div className=''>
                <SignUpForm closeModal={closeModal} />
                <p
                  className='my-2 pt-2 hover:cursor-pointer hover:text-slate-300 border-t-2 border-slate-500'
                  onClick={() => {
                    setModalType('login');
                  }}
                >
                  Already Registered? Try to Login
                </p>
              </div>
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
