import Input from './Input';
import { useDebouncedCallback } from 'use-debounce/lib';
import { useState } from 'react';
import api from 'api/index';
import { Contact } from 'components/Main/Menu/Components/Index';
import { useAppDispatch } from 'hooks/useDispatch';
import { ACTION_TYPES } from 'store';

const NewChat = ({ closeNewChat }: NewChatProps) => {
  const [newChatSearch, setNewChatSearch] = useState('');
  const [foundNewChats, setFoundNewChats] = useState([]);

  const debounced = useDebouncedCallback(async (value: string) => {
    const { data } = await api.get(`/users?nickname=${value}`);
    setFoundNewChats(data.results);
  }, 1000);

  const handleOnChange = (newValue: string) => {
    setNewChatSearch(newValue);
    debounced(newValue);
  };

  const dispatch = useAppDispatch();

  const addChat = async (id: string) => {
    // const contact = await db.contacts.get({ id });
    // if (!contact) await db.contacts.add({ id, messages: [] });
    dispatch({ type: ACTION_TYPES.SELECT_CONTACT, payload: { id } });
    closeNewChat();
  };

  return (
    <>
      <div className='bg-newChat-light w-100 px-5 h-28 flex items-end'>
        <span className='flex'>
          <button type='button' onClick={closeNewChat}>
            <svg viewBox='0 0 24 24' width='24' height='24'>
              <path
                fill='currentColor'
                d='M12 4l1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8 8-8z'
              ></path>
            </svg>
          </button>
          <p>New Chat</p>
        </span>
      </div>
      <Input
        autoFocus
        value={newChatSearch}
        onChange={(e) => handleOnChange(e.target.value)}
      />
      <div className='bg-contact-dark flex-grow'>
        {foundNewChats?.map((chat: any) => (
          <Contact
            newContact
            id={chat._id}
            key={chat._id}
            onClick={() => addChat(chat._id)}
          />
        ))}
      </div>
    </>
  );
};

export default NewChat;

interface NewChatProps {
  closeNewChat: () => void;
}
