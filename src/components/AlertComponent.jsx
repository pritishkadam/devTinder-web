import { alertTypes } from '../enums/alerts';

const AlertComponent = (props) => {
  const { alertType, message } = props;
  const successAlert =
    'w-auto flex justify-between items-center bg-red-100 border border-green-400 text-green-700 px-4 py-3 rounded fixed top-4 right-4';
  const errorAlert =
    'w-auto flex justify-between items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded fixed top-4 right-4';
  return (
    <div
      className={alertType === alertTypes.SUCCESS ? successAlert : errorAlert}
      role='alert'
    >
      <span className='block sm:inline'>{message}</span>
    </div>
  );
};

export default AlertComponent;
