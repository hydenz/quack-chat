import classNames from 'classnames';
import Check from './Check';

const Message = ({ sentByMe, content, timestamps }: MessageProps) => {
  const className = classNames(
    {
      'self-end': sentByMe,
      'self-start': !sentByMe,
      'bg-message-sent': sentByMe,
      'bg-message-received': !sentByMe,
    },
    'rounded-message text-message-content pr-1.5 pb-1.75 pl-2 pt-2.25 flex items-center'
  );

  const genCheck = () => {
    if (!sentByMe || timestamps.clientReceived) return 'client-received';
    else if (timestamps.serverReceived) return 'server-received';
    else return 'loading';
  };

  const checkState = genCheck();

  return (
    <div className={className}>
      <span className='pr-2'>{content}</span>
      <span className='flex self-end'>
        <span className='text-xs'>
          {new Date(timestamps.first).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
        <Check state={checkState} />
      </span>
    </div>
  );
};

export default Message;

interface MessageProps {
  sentByMe: boolean;
  content: string;
  timestamps: {
    first: number;
    clientReceived?: number;
    serverReceived?: number;
  };
}
