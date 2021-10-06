import { useAppSelector } from 'hooks/useSelector';
import { Actions, Conversation, Header } from './Components/Index';

const Chat = () => {
  const selectedContactId = useAppSelector((state) => state.selectedContactId);
  return (
    <div className='flex flex-col flex-grow bg-idle'>
      {selectedContactId && (
        <>
          <Header />
          <Conversation />
          <Actions />
        </>
      )}
    </div>
  );
};

export default Chat;
