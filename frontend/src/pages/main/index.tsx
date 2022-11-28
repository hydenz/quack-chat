import { useEffect, useState } from "react";
import { subscribeToMessages, unsubscribeToMessages } from "@utils/websocket";
import SideMenu from "@layouts/SideMenu";
import { ChatContext } from "@contexts/chat";
import Chat from "@layouts/Chat";

const Main = () => {
  const [currentChatId, setCurrentChatId] = useState("");

  useEffect(() => {
    subscribeToMessages();

    return () => {
      unsubscribeToMessages();
    };
  }, []);

  return (
    // <ChatContext.Provider
    //   value={{ currentId: currentChatId, setCurrentId: setCurrentChatId }}
    // >
    <>
      <SideMenu
        currentChatId={currentChatId}
        setCurrentChatId={setCurrentChatId}
      />
      <div className="flex flex-col flex-grow bg-idle">
        {currentChatId && <Chat currentChatId={currentChatId} />}
      </div>
    </>
    // </ChatContext.Provider>
  );
};

export default Main;
