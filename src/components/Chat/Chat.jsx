import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createSocketConnection } from '../../utils/socket';
import { connect, useSelector } from 'react-redux';
import sendMessageIcon from './../../assets/sendButton.png';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import defaultUserIcon from './../../assets/defaultUserIcon.png';
import backButton from './../../assets/backButton.png';

const Chat = () => {
  const { targetUserId } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user.userDetails);
  const userId = userData._id;
  const firstName = userData.firstName;
  const [messages, setMessages] = useState([]);
  const [isUserOnline, setIsUserOnline] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [connectionDetails, setConnectionDetails] = useState({
    fetching: false,
    error: false,
    errorMessage: undefined,
    data: undefined,
  });

  const fetchChatMessages = async () => {
    const API_URL = BASE_URL + '/chat/message/' + targetUserId;
    const chat = await axios.get(API_URL, {
      withCredentials: true,
    });

    const chatMessages = chat?.data?.data?.messages.map((msg) => {
      const { sender, text } = msg;
      return {
        firstName: sender?.firstName,
        lastName: sender?.lastName,
        sender: sender?._id,
        message: text,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  const fetchConnectionDetails = async () => {
    const API_URL = `${BASE_URL}/user/profile/${targetUserId}`;
    try {
      setConnectionDetails({
        fetching: true,
        error: false,
        errorMessage: undefined,
        data: undefined,
      });
      const { error, data } = await axios.get(API_URL, {
        withCredentials: true,
      });
      if (error || data.error) {
        throw new Error(data.errorMessage);
      }
      setConnectionDetails({ fetching: false, error: false, data: data.data });
    } catch (e) {
      setConnectionDetails({
        fetching: false,
        error: true,
        errorMessage: e.message,
        data: undefined,
      });
    }
  };

  useEffect(() => {
    if (targetUserId) {
      fetchConnectionDetails();
    }
  }, [targetUserId]);

  useEffect(() => {
    if (!userId || !targetUserId) {
      return null;
    }
    const socket = createSocketConnection();
    // As soon as the page is loaded, the socket connection is made and joinChat event is emitted
    socket.emit('joinChat', { userId, targetUserId });

    socket.on('messageReceived', ({ firstName, sender, message }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { firstName, sender, message },
      ]);
    });

    socket.on('getUsers', ({ onlineUsers }) => {
      const users = onlineUsers ? onlineUsers : [];
      if (users.includes(targetUserId)) {
        setIsUserOnline(true);
      } else {
        setIsUserOnline(false);
      }
    });

    return () => {
      socket.emit('disconnectSession', { userId });
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit('sendMessage', {
      firstName,
      userId,
      targetUserId,
      message: newMessage,
    });
    setNewMessage('');
  };

  return (
    <div>
      {connectionDetails.data && connectionDetails.data.length === 0 && (
        <h1>Something went wrong!</h1>
      )}
      {connectionDetails.data && (
        <div className='w-full p-5 h-screen overflow-hidden'>
          <div className='w-full h-[80%] md:h-[90%] relative mb-1 overflow-y-scroll rounded-lg bg-base-100'>
            <div className='h-16 z-10 sticky top-0 flex items-center gap-2 px-2 bg-base-300'>
              <img
                src={backButton}
                onClick={() => {
                  navigate('/matches');
                }}
                className='w-8 h-8 p-1 block md:hidden self-center object-contain hover:bg-slate-400 rounded-full cursor-pointer'
              />
              <img
                src={connectionDetails.data?.photoUrl}
                alt='Profile Picture'
                className='w-10 h-10 rounded-full border border-slate-800'
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = defaultUserIcon;
                }}
              />
              <div>
                <div className='text-xl'>
                  {connectionDetails.data?.firstName}
                </div>
                <div className='text-xs'>
                  {isUserOnline ? (
                    <>{<span className='text-[10px]'>&#128994; Online</span>}</>
                  ) : (
                    <>
                      {<span className='text-[10px]'>&#128308; Offline</span>}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className='p-2'>
              {messages &&
                messages.map((message, index) => {
                  const {
                    firstName: userName,
                    sender,
                    message: text,
                  } = message;
                  return (
                    <div
                      key={index}
                      className={`chat  ${
                        userId === sender ? 'chat-end' : 'chat-start'
                      }`}
                    >
                      <div className='chat-bubble'>{text}</div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className='w-full flex justify-center items-center rounded-lg bg-base-100'>
            <input
              type='text'
              placeholder='Start typing...'
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sendMessage();
                }
              }}
              className='w-full p-4 bg-transparent outline-none'
            />
            <button
              className='w-12 h-12 mx-2 rounded-full'
              onClick={sendMessage}
            >
              <img
                src={sendMessageIcon}
                className='w-10 h-10 rounded-full hover:cursor-pointer hover:bg-slate-100'
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
