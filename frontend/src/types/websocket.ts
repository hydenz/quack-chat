import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

export interface ExtWebSocket
  extends Socket<DefaultEventsMap, DefaultEventsMap> {
  subscribeToMessages?: () => void;
  unsubscribeToMessages?: () => void;
  checkIsOnline?: (contactId: string, cb: (isOnline: boolean) => void) => void;
}
