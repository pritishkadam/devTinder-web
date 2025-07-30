import { useEffect, useState } from 'react';

const Snackbar = ({ message, show, onClose, duration = 4000 }) => {
  const [close, setClose] = useState(show ? show : false);
  useEffect(() => {
    if (!close) return;
    const timer = setTimeout(() => {
      setClose(!close);
    }, duration);

    return () => clearTimeout(timer);
  }, [close, setClose, duration]);

  if (!close) return null;

  return (
    <div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50'>
      <div className='bg-red-600 text-white px-4 py-3 rounded shadow-lg flex items-center space-x-3 animate-slide-in'>
        <span>{message}</span>
        <button onClick={()=>setClose(false)} className='text-white font-bold'>
          &times;
        </button>
      </div>
    </div>
  );
};

export default Snackbar;
