import { createContext, Dispatch } from 'react';

const ChatContext = createContext<
  | { current: string; setCurrent: Dispatch<React.SetStateAction<string>> }
  | undefined
>(undefined);

const ChatProvider = ChatContext.Provider;

export { ChatProvider, ChatContext };
