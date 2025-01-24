import { useState } from 'react';
import skillSet from '../enums/skills';

const SignUpForm = (props) => {
  const { closeModal } = props;

  const [step, setStep] = useState(4);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailID: '',
    password: '',
    age: '',
    gender: '',
    photoUrl: '',
    about: '',
    skills: [],
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = () => {
    console.log('Reached Here');
  };

  const onPrevious = () => {
    if (step !== 1) {
      setStep(step - 1);
    }
  };

  const onNext = () => {
    if (step < 4) {
      if (
        step === 2 &&
        (!formData.password ||
          !confirmPassword ||
          formData.password !== confirmPassword)
      ) {
        setPasswordError("Passwords don't match");
        return;
      } else {
        setPasswordError('');
        setStep(step + 1);
      }
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSkillsSelection = (interest) => {
    // const skillSet = new Set([...formData.skills, interest]);
    let skillSet = formData.skills;
    if (formData.skills.includes(interest)) {
      skillSet = formData.skills.filter((skill) => skill !== interest);
    } else {
      skillSet.push(interest);
    }
    setFormData({
      ...formData,
      skills: Array.from(skillSet),
    });
  };

  return (
    <div>
      <h2 className='text-2xl font-bold text-white pb-2'>Create Account</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className='w-4/5 mx-auto py-2'>
            <label className='form-control w-full max-w-xs mx-auto'>
              <div className='label'>
                <span className='label-text'>1. Personal Details</span>
              </div>
            </label>
            <label className='form-control w-full max-w-xs mx-auto'>
              <div className='label'>
                <span className='label-text'>Firstname</span>
              </div>
              <input
                type='text'
                placeholder='Enter FirstName'
                name='firstName'
                value={formData.firstName}
                onChange={handleFormChange}
                className='input input-bordered w-full max-w-xs'
              />
            </label>

            <label className='form-control w-full max-w-xs mx-auto'>
              <div className='label'>
                <span className='label-text'>Lastname</span>
              </div>
              <input
                type='text'
                placeholder='Enter LastName'
                name='lastName'
                value={formData.lastName}
                onChange={handleFormChange}
                className='input input-bordered w-full max-w-xs'
              />
            </label>
            <label className='form-control w-full max-w-xs mx-auto'>
              <div className='label'>
                <span className='label-text'>Age</span>
              </div>
              <input
                type='number'
                placeholder='Enter Age'
                min={'18'}
                max={'90'}
                name='age'
                value={formData.age}
                onChange={handleFormChange}
                className='input input-bordered w-full max-w-xs'
              />
            </label>
            <label className='form-control w-full max-w-xs mx-auto'>
              <div className='label'>
                <span className='label-text'>Gender</span>
              </div>
              <label className='flex items-center gap-2 ml-2'>
                <input
                  type='radio'
                  id='male'
                  name='gender'
                  value='Male'
                  checked={formData.gender === 'Male'}
                  onChange={handleFormChange}
                />{' '}
                <label htmlFor='male'>Male</label>{' '}
                <input
                  type='radio'
                  id='female'
                  name='gender'
                  value='Female'
                  checked={formData.gender === 'Female'}
                  onChange={handleFormChange}
                />{' '}
                <label htmlFor='female'>Female</label>
              </label>
            </label>
          </div>
        )}
        {step === 2 && (
          <div className='w-4/5 mx-auto py-2 pb-4'>
            <label className='form-control w-full max-w-xs mx-auto'>
              <div className='label'>
                <span className='label-text'>2. Credentials</span>
              </div>
            </label>
            <label className='form-control w-full max-w-xs mx-auto'>
              <div className='label'>
                <span className='label-text'>EmailID</span>
              </div>
              <input
                type='email'
                placeholder='Enter EmailID'
                name='emailID'
                value={formData.emailID}
                onChange={handleFormChange}
                className='input input-bordered w-full max-w-xs'
              />
            </label>
            <label className='form-control w-full max-w-xs mx-auto'>
              <div className='label'>
                <span className='label-text'>Password</span>
              </div>
              <div className='w-full flex justify-between items-center input input-bordered'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter Password'
                  name='password'
                  value={formData.password}
                  onChange={handleFormChange}
                  className='w-full max-w-xs'
                />
                <p
                  className='text-sm text-slate-400'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </p>
              </div>
            </label>
            <label className='form-control w-full max-w-xs mx-auto'>
              <div className='label'>
                <span className='label-text'>Confirm Password</span>
              </div>
              <div className='w-full flex justify-between items-center input input-bordered'>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder='Enter Confirm Password'
                  name='confirmPassword'
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  className='w-full max-w-xs'
                />
                <p
                  className='text-sm text-slate-400'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </p>
              </div>
            </label>
            <label className='form-control w-full max-w-xs mx-auto'>
              {passwordError && (
                <div className='label'>
                  <span className='label-text text-red-600'>
                    {passwordError}
                  </span>
                </div>
              )}
            </label>
          </div>
        )}
        {step === 3 && (
          <div className='w-4/5 mx-auto py-2'>
            <label className='form-control w-full max-w-xs mx-auto'>
              <div className='label'>
                <span className='label-text'>3. Skills / Interested in: </span>
              </div>
            </label>
            <label className='form-control w-full max-w-xs mx-auto'>
              <div className='label'>
                <span className='label-text'>
                  Select the skills you are interested in:
                </span>
              </div>
              <textarea
                className='textarea textarea-bordered'
                placeholder='Bio'
                name='skills'
                value={formData.skills ? formData.skills.join(', ') : ''}
              >
                {formData.skills}
              </textarea>
              <div className='w-full h-40 my-2 overflow-y-auto flex flex-wrap gap-2'>
                {skillSet &&
                  skillSet.map((element, index) => (
                    <span
                      key={index}
                      className={
                        'p-1 rounded-full bg-slate-400 cursor-pointer' +
                        formData.skills.includes(element)
                          ? 'p-1 rounded-full cursor-pointer bg-slate-600'
                          : 'p-1 rounded-full cursor-pointer bg-slate-600'
                      }
                      onClick={() => handleSkillsSelection(element)}
                    >
                      {element}
                    </span>
                  ))}
              </div>
            </label>
          </div>
        )}
        {step === 4 && (
          <div className='w-4/5 mx-auto py-2'>
            <label className='form-control w-full max-w-xs mx-auto'>
              <div className='label'>
                <span className='label-text'>
                  4. Mention something about yourself:{' '}
                </span>
              </div>
            </label>
            <label className='form-control w-full max-w-xs mx-auto'>
              <textarea
                className='textarea textarea-bordered'
                placeholder='Bio'
                name='about'
                value={formData.about}
              >
                {formData.about}
              </textarea>
            </label>
            <label className='form-control w-full max-w-xs mx-auto'>
              <div className='label'>
                <span className='label-text'>Profile Picture: </span>
              </div>
            </label>
            <label className='form-control w-full max-w-xs mx-auto'>
              <input type='file' />
            </label>
          </div>
        )}
      </form>
      <div className='flex justify-end space-x-2'>
        <button
          onClick={onPrevious}
          disabled={step === 1 ? true : false}
          className='bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-700 hover:cursor-pointer disabled:cursor-not-allowed disabled:hover:bg-gray-500'
        >
          ❮ Previous
        </button>
        {/* Button for confirm action */}

        <button
          className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700'
          onClick={step === 4 ? handleSubmit : onNext}
        >
          {step === 4 ? 'Submit' : 'Next'} ❯
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
