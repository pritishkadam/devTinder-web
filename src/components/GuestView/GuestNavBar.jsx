import AuthButton from '../User/AuthButton';

const GuestNavBar = () => {
  return (
    <nav className='navbar bg-transparent dark:bg-transparent relative z-10'>
      <div className='navbar-start mx-2'>
        <a className='text-xl flex justify-center items-center cursor-pointer'>
          <div className='w-10 rounded-full'>
            <img alt='DevTinder Logo' src={'/guestViewIcon.png'} />
          </div>
          <span className='ml-1 font-bold text-2xl'>devTinder</span>
        </a>
      </div>

      <div className='navbar-end my-2 mx-2'>
        <AuthButton buttonType={'login'} />
      </div>
    </nav>
  );
};

export default GuestNavBar;
