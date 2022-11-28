import { ChatContext } from "@contexts/chat";
import { useContext } from "react";

const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined)
    throw new Error("SelectedContactContext is undefined");

  const { current } = context;
  const select = (id: string) => context.setCurrent(id);
  const deselect = () => context.setCurrent("");

  return { current, select, deselect };
};

export default useChat;
