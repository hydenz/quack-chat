import { Dispatch, useEffect, useState } from "react";
import { Contact, Input, EditProfile, Slider } from "@components";
import SideMenuHeader from "./SideMenuHeader";
import NewChat from "./NewChat";
import type { Contact as ContactType } from "utils/Dexie";
import { useLiveQuery } from "dexie-react-hooks";
// import { useAppDispatch } from 'hooks/useDispatch';
import getHour from "@utils/time";
import db from "@utils/Dexie";
import { CSSTransition, TransitionGroup } from "react-transition-group";
// import { useSelector } from "hooks/useSelector";

function SideMenu({ currentChatId, setCurrentChatId }: ISideMenuProps) {
  const [showNewChat, setShowNewChat] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [contactSearch, setContactSearch] = useState("");

  // const selectedContactId = useSelector((state) => state.selectedContactId);

  // const dispatch = useAppDispatch();

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
  const deselectContact = () => setCurrentChatId("");

  return (
    <div className="w-100 relative">
      <div className="flex flex-col h-screen border-r border-divider">
        <Slider
          show={showEditProfile}
          title="Edit profile"
          onClose={() => setShowEditProfile(false)}
        >
          <EditProfile />
        </Slider>
        <Slider
          show={showNewChat}
          title="Start a conversation"
          onClose={() => setShowNewChat(false)}
        >
          <NewChat
            onSelection={(id: string) => {
              setCurrentChatId(id);
              setShowNewChat(false);
            }}
          />
        </Slider>
        <SideMenuHeader
          openNewChat={() => setShowNewChat(true)}
          openEditProfile={() => setShowEditProfile(true)}
        />
        <Input placeholder="Search a conversation" />
        <div className="flex-grow bg-contact-dark scrollbar-thin relative">
          {contacts && sortedMessages && (
            <TransitionGroup appear>
              {contacts.map(({ id }: ContactType) => (
                <CSSTransition classNames="fade" timeout={300} key={id}>
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
}

export default SideMenu;

interface ISideMenuProps {
  currentChatId: string;
  setCurrentChatId: Dispatch<React.SetStateAction<string>>;
}
