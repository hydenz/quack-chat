import { Dispatch, useEffect, useState } from 'react';
import { Contact, Header, Input } from './Components/Index';
import NewChat from './Components/NewChat';
import type { Contact as ContactType } from 'utils/Dexie';
import { useLiveQuery } from 'dexie-react-hooks';
import { useAppDispatch } from 'hooks/useDispatch';
import getHour from 'utils/time';
import { ACTION_TYPES } from 'store';
import db from 'utils/Dexie';
import EditProfile from './Components/EditProfile';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Slider from './Components/Slider';
import { useAppSelector } from 'hooks/useSelector';

const Menu = ({ currentChatId, setCurrentChatId }: MenuProps) => {
  const [showNewChat, setShowNewChat] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [contactSearch, setContactSearch] = useState('');

  // const selectedContactId = useAppSelector((state) => state.selectedContactId);

  const dispatch = useAppDispatch();

  const [contacts, sortedMessages] = useLiveQuery(
    async () => {
      const fetchedContacts = await db.contacts.toArray();
      const messages = await db.messages.toArray();
      const sortedMessages = messages
        .sort((a, b) => b.firstTimestamp - a.firstTimestamp)
        .filter(
          (v, i, a) => a.findIndex((t) => t.contactId === v.contactId) === i
        );
      return [fetchedContacts, sortedMessages];
    },
    [contactSearch],
    [undefined, undefined]
  );

  const selectContact = (id: string) => setCurrentChatId(id);
  const deselectContact = () => setCurrentChatId('');

  // dispatch({ type: ACTION_TYPES.SELECT_CONTACT, payload: { id } });

  const [numOfLoaded, setNumOfLoaded] = useState(0);
  const [picsFade, setPicsFade] = useState(false);

  useEffect(() => {
    if (numOfLoaded === contacts?.length) setPicsFade(true);
  }, [numOfLoaded, contacts?.length]);

  return (
    <div className='w-100 relative'>
      <div className='flex flex-col h-screen border-r border-divider'>
        <Slider
          show={showEditProfile}
          title='Edit profile'
          onClose={() => setShowEditProfile(false)}
        >
          <EditProfile />
        </Slider>
        <Slider
          show={showNewChat}
          title='Start a conversation'
          onClose={() => setShowNewChat(false)}
        >
          <NewChat
            onSelection={(id: string) => {
              setCurrentChatId(id);
              setShowNewChat(false);
            }}
          />
        </Slider>
        <Header
          openNewChat={() => setShowNewChat(true)}
          openEditProfile={() => setShowEditProfile(true)}
        />
        <Input placeholder='Search a conversation' />
        <div className='flex-grow bg-contact-dark scrollbar-thin relative'>
          {contacts && sortedMessages && (
            <TransitionGroup appear>
              {contacts.map(({ id }: ContactType) => (
                <CSSTransition classNames='fade' timeout={300} key={id}>
                  <Contact
                    id={id}
                    lastMessage={
                      sortedMessages.find((message) => message.contactId === id)
                        ?.content
                    }
                    selected={currentChatId === id}
                    lastMessageTimestamp={getHour(
                      sortedMessages.find(
                        (message) => message.contactId === id
                      )!.firstTimestamp
                    )}
                    onPictureLoad={() => setNumOfLoaded((old) => old + 1)}
                    pictureFade={picsFade}
                    onClick={() => selectContact(id)}
                    onDelete={deselectContact}
                    order={sortedMessages!.findIndex(
                      (el: any) => el.contactId === id
                    )}
                  />
                </CSSTransition>
              ))}
            </TransitionGroup>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;

interface MenuProps {
  currentChatId: string;
  setCurrentChatId: Dispatch<React.SetStateAction<string>>;
}
