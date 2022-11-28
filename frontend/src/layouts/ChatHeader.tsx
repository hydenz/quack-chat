import api from "@api";
import { ContactPhoto } from "@components";
import { useEffect } from "react";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { checkIsOnline } from "@utils/websocket";

const ChatHeader = ({ currentChatId }: IChatHeaderProps) => {
  const [contactData, setContactData] = useState({} as any);
  const [isContactOnline, setIsContactOnline] = useState(false);

  useEffect(() => {
    api.get(`/users/${currentChatId}`).then((resp) => {
      const { nickname, pictureHash } = resp.data.results[0];
      setContactData({ nickname, pictureHash });
    });

    const intervalId = setInterval(
      () =>
        checkIsOnline(currentChatId, (isOnline) => {
          setIsContactOnline(isOnline);
        }),
      5000
    );

    return () => clearInterval(intervalId);
  }, [currentChatId]);

  return (
    <div className="bg-header-dark text-header-dark flex w-full h-14 py-2 px-4">
      <span className="flex">
        <ContactPhoto pictureHash={contactData.pictureHash} />
        {/* <img
          src={`https://i.imgur.com/${contactData.pictureHash}`}
          className="inline h-full rounded-full"
        /> */}
        <div className="flex flex-col justify-center ml-4">
          <span className="text-default">{contactData.nickname}</span>
          <CSSTransition
            classNames="fade"
            in={isContactOnline}
            appear
            timeout={300}
            unmountOnExit
          >
            <span className="text-default text-sm">online</span>
          </CSSTransition>
        </div>
      </span>
    </div>
  );
};

export default ChatHeader;

interface IChatHeaderProps {
  currentChatId: string;
}
