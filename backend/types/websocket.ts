import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export interface ExtSocket
  extends Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap> {
  userId?: string;
}

export interface IncomingMessage {
  id: string;
  from: string;
  to: string;
  content: string;
}
