import MessageService from 'services/MessageService';
import { Server } from 'socket.io';
import { ExtSocket, IncomingMessage } from 'types/websocket';
import server from './server';

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.use((socket: ExtSocket, next) => {
  const userId: string | undefined = socket.handshake.auth.userId;
  if (!userId) {
    return next(new Error('invalid userId'));
  }
  socket.userId = userId;
  next();
});

io.on('connection', async (socket: ExtSocket) => {
  const userId = socket.userId!;
  socket.join(userId);
  const unreadMessages = await MessageService.getMessages(userId);
  if (unreadMessages.length) {
    socket.emit('fetch-unread-messages', unreadMessages);
    await MessageService.deleteMessages(userId);
  }

  socket.on(
    'message',
    (message: IncomingMessage, confirmServerReception: any) => {
      confirmServerReception();
      if (io.sockets.adapter.rooms.get(message.to)?.size)
        return socket.to(message.to).emit('message', message);
      MessageService.storeMessage(message);
    }
  );

  socket.on(
    'client-received-message',
    ({ contactId, id }: any, changes: any) => {
      return socket.to(contactId).emit('client-received-message', id, changes);
    }
  );
});

export default server;
