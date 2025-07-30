const LogoutConfirmation = ({ show, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm'>
      <div className='bg-white rounded-lg shadow-lg p-6 w-80 text-center animate-fade-in'>
        <h2 className='text-xl font-semibold mb-2 text-gray-700'>Confirm Logout</h2>
        <p className='mb-4 text-gray-700'>Are you sure you want to log out?</p>
        <div className='flex justify-center space-x-4'>
          <button
            onClick={onConfirm}
            className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded'
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className='px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded'
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmation;
