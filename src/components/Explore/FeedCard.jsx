import up from './../../assets/up.png';
import defaultUserIcon from './../../assets/defaultUserIcon.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveProfileDetails } from '../../store/profileSlice';

const FeedCard = (props) => {
  const { profile } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id, firstName, photoUrl, about } = profile;

  const aboutMe =
    about && about.length <= 150
      ? about
      : `${about.toString().substring(0, 150)} ...;`;

  const expandProfile = (profile) => {
    dispatch(saveProfileDetails(profile));
    navigate(`/explore/profile/${_id}`);
  };

  return (
    <div className='w-[22rem] h-[85vh] sm:h-[90vh] rounded-2xl bg-black drop-shadow-2xl shadow-lg shadow-indigo-300/40'>
      <div className='relative rounded-2xl rounded-b-none bg-base-300 h-[85%] '>
        <img
          src={photoUrl}
          className='h-full rounded-2xl'
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = defaultUserIcon;
          }}
        />
        <div className='w-full absolute bottom-0 px-4 h-20 bg-black bg-opacity-50 backdrop-blur-sm'>
          <div className='w-full flex justify-between'>
            {firstName && (
              <p className='text-4xl font-bold my-2'>{firstName}</p>
            )}
            <button
              onClick={() => {
                expandProfile(profile);
              }}
              className='w-8 h-8 rounded-full border border-white bg-black hover:scale-110 my-auto p-1'
            >
              <img src={up} className='w-8 object-contain' />
            </button>
          </div>
          {aboutMe && (
            <p className='text-base font-medium text-wrap'>{aboutMe}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
