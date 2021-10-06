import { Transition } from '@headlessui/react';
import { useState } from 'react';
import { Contact, Header, Input } from './Components/Index';
import NewChat from './Components/NewChat';
import type { Contact as ContactType } from 'utils/Dexie';
import { useLiveQuery } from 'dexie-react-hooks';
import { useAppDispatch } from 'hooks/useDispatch';
import { ACTION_TYPES } from 'store';
import db from 'utils/Dexie';

const Menu = () => {
  const [showNewChat, setShowNewChat] = useState(false);

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
    [],
    [undefined, undefined]
  );

  const selectContact = (id: string) =>
    dispatch({ type: ACTION_TYPES.SELECT_CONTACT, payload: { id } });

  return (
    <div className='w-100 relative'>
      <Transition
        show={showNewChat}
        enter='transition-all ease-in duration-200'
        enterFrom='-left-full'
        enterTo='left-0'
        leave='transition-all ease-in duration-200'
        leaveFrom='left-0'
        leaveTo='-left-full'
        className='w-100 h-full flex flex-col absolute z-20'
      >
        <NewChat closeNewChat={() => setShowNewChat(false)} />
      </Transition>
      <div className='flex flex-col h-screen border-r border-divider'>
        <Header openNewChat={() => setShowNewChat(true)} />
        <Input placeholder='Search a conversation' />
        <div className='overflow-auto flex-grow bg-contact-dark relative scrollbar-thin'>
          {contacts &&
            sortedMessages &&
            !!contacts.length &&
            contacts.map(({ id }: ContactType) => (
              <Transition
                key={id}
                show
                appear
                unmount
                enter='transition-opacity ease-in duration-200'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='transition-opacity ease-in duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <Contact
                  id={id}
                  lastMessage={
                    sortedMessages.find((message) => message.contactId === id)
                      ?.content
                  }
                  onClick={() => selectContact(id)}
                  order={sortedMessages!.findIndex(
                    (el: any) => el.contactId === id
                  )}
                />
              </Transition>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
