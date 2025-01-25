import Footer from '../../Footer';
import NavBar from './GuestNavBar';
import AuthButton from '../AuthButton';
import ReviewList from './ReviewList';

const GuestView = () => {
  return (
    <>
      <div className='bg-bannerImage sm:bg-repeat bg-cover sm:bg-bottom w-full h-screen'>
        <NavBar />
        <div className='w-full h-screen absolute top-0 z-0 bg-blackOverlay'>
          <div className='w-full h-screen flex justify-center items-center'>
            <div>
              <h1 className='text-5xl mx-4 sm:text-white sm:text-5xl md:text-7xl lg:text-8xl font-bold'>
                Start something epic.
                <h2 className='text-2xl  sm:text-white sm:text-2xl md:text-xl lg:text-2xl font-semibold'>
                  Connect with fellow devs!
                </h2>
              </h1>
              <br />
              <div className='flex justify-center'>
                <AuthButton buttonType={'register'} />
              </div>
            </div>
          </div>
          <div className='w-full h-auto p-4'>
            <ReviewList />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default GuestView;
