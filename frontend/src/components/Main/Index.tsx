import { useEffect, useState } from 'react';
import ws from 'utils/websocket';
import EntireChat from './Chat/Components/EntireChat';
import Chat from './Chat/Index';
import Menu from './Menu/Index';

const Main = () => {
  const [currentChatId, setCurrentChatId] = useState('');

  useEffect(() => {
    ws.subscribeToMessages!();

    return () => {
      ws.unsubscribeToMessages!();
    };
  }, []);

  return (
    <>
      <Menu currentChatId={currentChatId} setCurrentChatId={setCurrentChatId} />
      <div className='flex flex-col flex-grow bg-idle'>
        {currentChatId && <EntireChat currentChatId={currentChatId} />}
      </div>
    </>
  );
};

export default Main;
