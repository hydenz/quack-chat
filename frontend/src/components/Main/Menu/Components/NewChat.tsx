import Input from './Input';
import { useDebouncedCallback } from 'use-debounce/lib';
import { useEffect, useRef, useState } from 'react';
import api from 'api/index';
import { Contact } from 'components/Main/Menu/Components/Index';
import { useAppDispatch } from 'hooks/useDispatch';
import { ACTION_TYPES } from 'store';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const NewChat = ({ onSelection }: NewChatProps) => {
  const [newChatSearch, setNewChatSearch] = useState('');
  const [loaded, setLoaded] = useState<any>(0);
  const [foundNewChats, setFoundNewChats] = useState<any>([]);

  const debounced = useDebouncedCallback(async (value: string) => {
    const { data } = await api.get(`/users?nickname=${value}`);
    setLoaded(0);
    setFoundNewChats((oldChats: any) => {
      if (!oldChats.length) return data.results;
      const mappedNewChats = data.results.map((contact: any) => contact._id);
      const oldChatsFiltered = oldChats.filter((chat: any) =>
        mappedNewChats.includes(chat._id)
      );
      const oldChatsFilteredIds = oldChatsFiltered.map((chat: any) => chat._id);
      const newChatsFiltered = data.results.filter(
        (chat: any) => !oldChatsFilteredIds.includes(chat._id)
      );
      return [...oldChatsFiltered, ...newChatsFiltered];
    });
  }, 1000);
  const handleOnChange = (newValue: string) => {
    setNewChatSearch(newValue);
    debounced(newValue);
  };

  const dispatch = useAppDispatch();

  const addChat = async (id: string) => {
    dispatch({ type: ACTION_TYPES.SELECT_CONTACT, payload: { id } });
    onSelection();
  };

  const previousFoundChats = useRef<any>();

  useEffect(() => {
    previousFoundChats.current = foundNewChats.map((chat: any) => chat._id);
  }, [foundNewChats]);

  const getFade = (id: string) =>
    previousFoundChats.current.includes(id) || foundNewChats.length === loaded;

  return (
    <>
      <Input
        autoFocus
        value={newChatSearch}
        onChange={(e) => handleOnChange(e.target.value)}
      />
      <div className='bg-contact-dark flex-grow'>
        {foundNewChats && (
          <TransitionGroup appear>
            {foundNewChats.map((chat: any, idx: any) => (
              <CSSTransition classNames='fade' timeout={300} key={chat._id}>
                <Contact
                  newContact
                  onPictureLoad={() => setLoaded((old: any) => old + 1)}
                  pictureFade={getFade(chat._id)}
                  lastMessage={chat.status}
                  order={idx}
                  id={chat._id}
                  onClick={() => addChat(chat._id)}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </div>
    </>
  );
};

export default NewChat;

interface NewChatProps {
  onSelection: () => void;
}
