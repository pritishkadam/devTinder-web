import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../utils/constants';
import defaultUserIcon from './../../assets/defaultUserIcon.png';
import conversationIcon from './../../assets/conversation.png';

const Messages = () => {
  const [messages, setMessages] = useState({
    fetching: false,
    error: false,
    errorMessage: undefined,
    data: undefined,
  });
  const API_URL = BASE_URL + '/user/messages';

  const fetchMessages = async () => {
    try {
      const { error, data } = await axios.post(API_URL, null, {
        withCredentials: true,
      });
      if (error || data.error) {
        throw new Error(data.errorMessage);
      }
      setMessages({ fetching: false, error: false, data: data.data });
    } catch (e) {
      setMessages({
        fetching: false,
        error: true,
        errorMessage: e.message,
        data: undefined,
      });
    }
  };

  useEffect(() => {
    setMessages({
      fetching: true,
      error: false,
      errorMessage: undefined,
      data: undefined,
    });
    fetchMessages();
  }, []);

  return (
    <div className='my-2 py-2'>
      {messages.data &&
        messages.data.map((message) => (
          <div
            key={message._id}
            className='w-32 h-40 border-4 rounded-xl relative'
          >
            <img
              src={message.photoUrl}
              className='h-full rounded-2xl'
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = defaultUserIcon;
              }}
            />
            <h2 className='absolute bottom-2 mx-1'>{message.firstName}</h2>
          </div>
        ))}
      {messages.data !== undefined && messages?.data?.length === 0 && (
        <div>
          <img src={conversationIcon} className='w-40 h-40 mx-auto my-4' />
          <p className='h-96 mx-auto text-center'>
            <p className='text-3xl font-semibold my-4'>Say Hello</p>
            <p className='w-64 text-xl mx-auto'>
              Looking to strike up a conversation? When you match with others,
              you can send them a message under “Matches”
            </p>
          </p>
        </div>
      )}
      {messages.error && (
        <div className='w-full border text-center'>
          <p>Something went wrong!</p>
        </div>
      )}
    </div>
  );
};

export default Messages;
