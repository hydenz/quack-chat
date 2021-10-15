import Message from './Message';
import { useLiveQuery } from 'dexie-react-hooks';
import { useAppSelector } from 'hooks/useSelector';
import db from 'utils/Dexie';

const Conversation = () => {
  const selectedContactId = useAppSelector((state) => state.selectedContactId);

  const messages = useLiveQuery(async () => {
    const messages = await db.messages
      .where('contactId')
      .equals(selectedContactId)
      .toArray();
    return messages.sort(
      (a: any, b: any) => a.firstTimestamp - b.firstTimestamp
    );
  }, [selectedContactId]);

  return (
    <div className='bg-react-logo bg-100 overflow-auto flex flex-grow flex-col-reverse px-22 scrollbar-thin'>
      <div className='flex flex-col'>
        {messages &&
          !!messages.length &&
          messages.map(
            (
              {
                sentByMe,
                content,
                timestampClientReceived,
                timestampServerReceived,
                firstTimestamp,
              },
              idx
            ) => (
              <Message
                key={idx}
                content={content}
                sentByMe={sentByMe}
                timestamps={{
                  first: firstTimestamp,
                  clientReceived: timestampClientReceived,
                  serverReceived: timestampServerReceived,
                }}
              />
            )
          )}
      </div>
    </div>
  );
};

export default Conversation;
