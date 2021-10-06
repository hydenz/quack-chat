import { useEffect } from 'react';
import ws from 'utils/websocket';
import Chat from './Chat/Index';
import Menu from './Menu/Index';

const Main = () => {
  useEffect(() => {
    ws.subscribeToMessages!();

    return () => {
      ws.unsubscribeToMessages!();
    };
  }, []);

  return (
    <>
      <Menu />
      <Chat />
    </>
  );
};

export default Main;
