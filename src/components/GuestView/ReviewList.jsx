import ReviewCard from './ReviewCard';

const ReviewList = () => {
  const reviews = [
    {
      username: 'Simran',
      description:
        'This app has revolutionized how I connect with industry professionals. The ability to directly message colleagues and join specialized groups has been invaluable for my career growth. A must-have for anyone looking to expand their network in the tech world.',
    },
    {
      username: 'Vivek',
      description:
        'I enjoy the variety of networking opportunities this app offers, especially the focus on connecting people in similar industries. However, the user interface can be a bit overwhelming at first, and it could use some fine-tuning to improve overall usability.',
    },
    {
      username: 'Elon',
      description:
        'Great platform for professionals in the finance sector. The job postings and industry-specific content are a huge bonus. However, I’d love to see more integration with other tools and platforms that professionals use daily. Overall, it’s a solid network to be a part of.',
    },
  ];

  return (
    <div className='flex gap-4 flex-wrap w-full justify-evenly items-center my-5'>
      {reviews && reviews.map((review) => <ReviewCard key={review.username} review={review} />)}
    </div>
  );
};

export default ReviewList;
