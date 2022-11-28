import { createContext, Dispatch } from "react";

const ChatContext = createContext<
  | { currentId: string; setCurrentId: Dispatch<React.SetStateAction<string>> }
  | undefined
>(undefined);

const ChatProvider = ChatContext.Provider;

export { ChatProvider, ChatContext };
