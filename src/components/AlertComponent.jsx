const AlertComponent = (props) => {
  const { alertType, message } = props;
  return (
    <div
      className='w-auto flex justify-between items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded fixed top-4 right-4'
      role='alert'
    >
      <span className='block sm:inline'>{message}</span>
    </div>
  );
};

export default AlertComponent;
