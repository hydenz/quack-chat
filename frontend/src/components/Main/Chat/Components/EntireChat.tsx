import api from 'api';
import { useLiveQuery } from 'dexie-react-hooks';
import { useAppSelector } from 'hooks/useSelector';
import { useEffect, useRef, useState } from 'react';
import ws from 'utils/websocket';
import db from 'utils/Dexie';
import jwtDecode from 'jwt-decode';
import { CSSTransition } from 'react-transition-group';
import Message from './Message';

const EntireChat = ({ currentChatId }: EntireChatProps) => {
  const [contactData, setContactData] = useState({} as any);
  const [isContactOnline, setIsContactOnline] = useState(false);
  const [message, setMessage] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  // const selectedContactId = useAppSelector((state) => state.selectedContactId);

  useEffect(() => {
    api.get(`/users/${currentChatId}`).then((resp) => {
      const { nickname, pictureHash } = resp.data.results[0];
      setContactData({ nickname, pictureHash });
    });

    const intervalId = setInterval(
      () =>
        ws.checkIsOnline!(currentChatId, (isOnline) => {
          if (isOnline) return setIsContactOnline(true);
          setIsContactOnline(false);
        }),
      5000
    );

    return () => clearInterval(intervalId);
  }, [currentChatId]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentChatId]);

  const messages = useLiveQuery(async () => {
    const messages = await db.messages
      .where('contactId')
      .equals(currentChatId)
      .toArray();
    return messages.sort(
      (a: any, b: any) => a.firstTimestamp - b.firstTimestamp
    );
  }, [currentChatId]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;

    const newMessageId = await db.addMessage({
      contactId: currentChatId,
      content: message,
      sentByMe: true,
    });
    const myId = (jwtDecode(localStorage.getItem('accessToken')!) as any).id;
    ws.emit(
      'message',
      {
        id: newMessageId,
        from: myId,
        to: currentChatId,
        content: message,
      },
      () =>
        db.updateMessage(newMessageId, { timestampServerReceived: Date.now() })
    );
    setMessage('');
  };

  const handleOnChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = ev.target.value;
    if (userInput === ' ') return;
    setMessage(userInput);
  };

  return (
    <>
      <div className='bg-header-dark text-header-dark flex w-full h-14 py-2 px-4'>
        <span className='flex'>
          <img
            src={`https://i.imgur.com/${contactData.pictureHash}`}
            className='inline h-full rounded-full'
          />
          <div className='flex flex-col justify-center ml-4'>
            <span className='text-default'>{contactData.nickname}</span>
            <CSSTransition
              classNames='fade'
              in={isContactOnline}
              appear
              timeout={300}
              unmountOnExit
            >
              <span className='text-default text-sm'>online</span>
            </CSSTransition>
          </div>
        </span>
      </div>
      <div className='bg-react-logo bg-100 overflow-auto flex flex-grow flex-col-reverse px-22 scrollbar-thin'>
        <div className='flex flex-col'>
          {messages &&
            !!messages.length &&
            messages.map(
              (
                {
                  sentByMe,
                  content,
                  timestampClientReceived,
                  timestampServerReceived,
                  firstTimestamp,
                },
                idx
              ) => (
                <Message
                  key={idx}
                  content={content}
                  sentByMe={sentByMe}
                  timestamps={{
                    first: firstTimestamp,
                    clientReceived: timestampClientReceived,
                    serverReceived: timestampServerReceived,
                  }}
                />
              )
            )}
        </div>
      </div>
      <div className='h-16 bg-actions-dark flex items-center py-3.5 px-2.5'>
        <button className='px-2.5'>
          <svg
            viewBox='0 0 24 24'
            width='26'
            height='26'
            className='text-actions-icons'
          >
            <path
              fill='currentColor'
              d='M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z'
            ></path>
          </svg>
        </button>
        <div className='bg-actions-light flex-grow rounded-3xl px-3 py-2.5'>
          <form onSubmit={sendMessage}>
            <input
              type='text'
              ref={inputRef}
              className='w-full bg-actions-light outline-none text-actions-message'
              placeholder='Enter a message'
              onChange={handleOnChange}
              value={message}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default EntireChat;

interface EntireChatProps {
  currentChatId: string;
}
