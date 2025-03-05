const ProfileSkeleton = () => {
  return (
    <div className='w-full h-screen relative mx-auto flex justify-center overflow-y-scroll'>
      <div className='animate-pulse w-[22rem] h-[82vh] sm:h-[90vh] rounded-2xl bg-black drop-shadow-2xl shadow-lg shadow-indigo-300/40'>
        <div className='h-full relative rounded-2xl bg-slate-800 p-4'>
          <div className='w-full h-[80%] bg-slate-700 p-2 my-2' />
          <div className='w-full h-16 absolute bottom-16'>
            <div className='w-60 h-10 flex justify-between my-2 bg-slate-700' />
            <p className='w-72 h-10 text-base font-medium text-wrap bg-slate-700' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
