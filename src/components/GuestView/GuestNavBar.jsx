import AuthButton from '../User/AuthButton';

const GuestNavBar = () => {
  return (
    <nav className='navbar h-12 bg-transparent dark:bg-[#00000030] sticky top-0 z-10'>
      <div className='navbar-start mx-2'>
        <a className='text-xl flex justify-center items-center cursor-pointer'>
          <div className='w-12 rounded-full'>
            <img alt='DevTinder Logo' src={'/devTinder_Logo.png'} />
          </div>
          <span className='ml-1 font-bold text-3xl'>devTinder</span>
        </a>
      </div>

      <div className='navbar-end my-2 mx-2'>
        <AuthButton buttonType={'login'} />
      </div>
    </nav>
  );
};

export default GuestNavBar;
