import Message from "../components/Message";
import { useLiveQuery } from "dexie-react-hooks";
import db from "utils/Dexie";
import { useSelector } from "@hooks";

const Conversation = ({ currentChatId }: IConversationProps) => {
  const messages = useLiveQuery(
    async () => {
      const messages = await db.messages
        .where("contactId")
        .equals(currentChatId)
        .toArray();

      return messages.sort(
        (a: any, b: any) => a.firstTimestamp - b.firstTimestamp
      );
    },
    [currentChatId],
    []
  );

  return (
    <div className="bg-react-logo bg-100 overflow-auto flex flex-grow flex-col-reverse px-22 scrollbar-thin">
      <div className="flex flex-col">
        {messages.length > 0 &&
          messages.map((message, index) => (
            <Message
              key={index}
              content={message.content}
              sentByMe={message.sentByMe}
              timestamps={{
                first: message.firstTimestamp,
                clientReceived: message.timestampClientReceived,
                serverReceived: message.timestampServerReceived,
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default Conversation;

interface IConversationProps {
  currentChatId: string;
}
