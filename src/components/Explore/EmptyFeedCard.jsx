const EmptyFeedCard = () => {
  return (
    <div className='w-full h-screen relative mx-auto flex justify-center overflow-y-scroll'>
      <div className='w-[22rem] h-[85vh] sm:h-[90vh] border rounded-2xl drop-shadow-2xl shadow-lg shadow-indigo-300/40'>
        <div className='h-full relative rounded-2xl bg-slate-800 p-4 flex flex-col justify-center items-center gap-4'>
          <p className='mx-4 text-center text-xl'>
            {"You've seen all the profiles for today! 🎉"}
          </p>
          <p className='mx-4 text-center text-lg'>{'Keep the connection going!'}</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyFeedCard;
