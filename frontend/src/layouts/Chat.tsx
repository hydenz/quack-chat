import ChatHeader from "./ChatHeader";
import Conversation from "./Conversation";
import ChatBottomActions from "./ChatBottomActions";

const Chat = ({ currentChatId }: IChatProps) => {
  return (
    <div className="flex flex-col flex-grow bg-idle">
      {currentChatId && (
        <>
          <ChatHeader currentChatId={currentChatId} />
          <Conversation currentChatId={currentChatId} />
          <ChatBottomActions currentChatId={currentChatId} />
        </>
      )}
    </div>
  );
};

export default Chat;

interface IChatProps {
  currentChatId: string;
}
