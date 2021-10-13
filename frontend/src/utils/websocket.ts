import { ExtWebSocket } from 'types/websocket';
import { io } from 'socket.io-client';
import db from 'utils/Dexie';
import jwtDecode from 'jwt-decode';

const ws: ExtWebSocket = io('http://localhost:3001', {
  auth: {
    userId: (jwtDecode(localStorage.getItem('accessToken')!) as any).id,
  },
});

const addReceivedMessageToDb = async ({ id, content, from, to }: any) => {
  await db.addMessage({
    id,
    contactId: from,
    content,
    sentByMe: false,
  });

  ws.emit(
    'client-received-message',
    {
      contactId: from,
      id,
    },
    { timestampClientReceived: Date.now() }
  );
};

const updateReceivedMessage = async (messageId: string, changes: any) => {
  await db.updateMessage(messageId, changes);
};

ws.subscribeToMessages = () => {
  ws.on('message', addReceivedMessageToDb);
  ws.on('client-received-message', updateReceivedMessage);
};

ws.unsubscribeToMessages = () => {
  ws.off('message', addReceivedMessageToDb);
  ws.off('client-received-message', updateReceivedMessage);
};

ws.once('fetch-unread-messages', async (messages) => {
  for (let message of messages) {
    for (let msgData of message.data) {
      await addReceivedMessageToDb({
        from: message.from,
        content: msgData.content,
        to: message.to,
        id: msgData.id,
      });
    }
  }
});

ws.checkIsOnline = (contactId: string, cb: (isOnline: boolean) => void) => {
  ws.emit('is-online', contactId, (isOnline: boolean) => {
    cb(isOnline);
  });
};

export default ws;
