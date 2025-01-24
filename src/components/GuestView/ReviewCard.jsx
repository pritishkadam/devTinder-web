const ReviewCard = (props) => {
  const { review } = props;
  const { username, description } = review;
  return (
    <div className='card bg-base-100 w-full sm:w-96 md:w-[30rem] shadow-xl'>
      <div className='card-body'>
        <h2 className='card-title my-2'>{username}</h2>
        <hr />
        <p className="my-2">{description}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
