import fetchError from './../assets/fetchDataError.png';

const FeedCardError = () => {
  return (
    <div className='w-full h-screen relative mx-auto flex justify-center overflow-y-scroll'>
      <div className='w-[26rem] h-[82vh] sm:h-[90vh] rounded-2xl drop-shadow-2xl shadow-lg shadow-indigo-300/40'>
        <div className='h-full relative rounded-2xl bg-slate-800 p-4 flex flex-col justify-center items-center gap-4'>
          <img src={fetchError} className='w-24 h-24' />
          <p className='mx-4 text-center text-xl'>
            {
              'The data didn’t make it through. We’re sending a search party to find it!'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeedCardError;
