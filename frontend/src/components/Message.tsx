import classNames from "classnames";
import getHour from "@utils/time";
import { ReactComponent as LoadingMessageIcon } from "@assets/message-loading.svg";
import { ReactComponent as ClientReceivedMessageIcon } from "@assets/message-client-received.svg";
import { ReactComponent as ServerReceivedMessageIcon } from "@assets/message-server-received.svg";

const statusMapping = {
  loading: <LoadingMessageIcon />,
  "server-received": <ServerReceivedMessageIcon />,
  "client-received": <ClientReceivedMessageIcon />,
};

const Message = ({ sentByMe, content, timestamps }: IMessageProps) => {
  const className = classNames(
    {
      "self-end": sentByMe,
      "self-start": !sentByMe,
      "bg-message-sent": sentByMe,
      "bg-message-received": !sentByMe,
    },
    "rounded-message text-message-content pr-1.5 pb-1.75 pl-2 pt-2.25 mb-0.5 flex items-center"
  );

  const genCheck = () => {
    if (!sentByMe || timestamps.clientReceived) return "client-received";
    else if (timestamps.serverReceived) return "server-received";
    else return "loading";
  };

  const messageStatus = genCheck();

  return (
    <div className={className}>
      <span className="pr-2">{content}</span>
      <span className="flex self-end">
        <span className="text-xs">{getHour(timestamps.first)}</span>
        {statusMapping[messageStatus]}
      </span>
    </div>
  );
};

export default Message;

interface IMessageProps {
  sentByMe: boolean;
  content: string;
  timestamps: {
    first: number;
    clientReceived?: number;
    serverReceived?: number;
  };
}
