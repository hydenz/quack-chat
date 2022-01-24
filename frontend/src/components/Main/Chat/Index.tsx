import { useAppSelector } from 'hooks/useSelector';
import EntireChat from './Components/EntireChat';
import { Actions, Conversation, Header } from './Components/Index';

const Chat = () => {
  const selectedContactId = useAppSelector((state) => state.selectedContactId);

  return (
    <div className='flex flex-col flex-grow bg-idle'>
      {selectedContactId && (
        <>
          {/* <EntireChat /> */}
          {/* <Header />
          <Conversation />
          <Actions /> */}
        </>
      )}
    </div>
  );
};

export default Chat;
