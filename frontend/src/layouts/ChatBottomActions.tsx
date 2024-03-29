import { useEffect, useRef, useState } from "react";
import jwtDecode from "jwt-decode";
import { useSelector } from "@hooks";
import db from "utils/Dexie";
import ws from "utils/websocket";

const ChatBottomActions = ({ currentChatId }: IChatBottomActions) => {
  const [message, setMessage] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentChatId]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;

    const newMessageId = await db.addMessage({
      contactId: currentChatId,
      content: message,
      sentByMe: true,
    });
    const myId = (jwtDecode(localStorage.getItem("accessToken")!) as any).id;
    ws.emit(
      "message",
      {
        id: newMessageId,
        from: myId,
        to: currentChatId,
        content: message,
      },
      () =>
        db.updateMessage(newMessageId, { timestampServerReceived: Date.now() })
    );
    setMessage("");
  };

  const handleOnChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = ev.target.value;
    if (userInput === " ") return;
    setMessage(userInput);
  };

  return (
    <div className="h-16 bg-actions-dark flex items-center py-3.5 px-2.5">
      <button className="px-2.5">
        <svg
          viewBox="0 0 24 24"
          width="26"
          height="26"
          className="text-actions-icons"
        >
          <path
            fill="currentColor"
            d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"
          ></path>
        </svg>
      </button>
      <div className="bg-actions-light flex-grow rounded-3xl px-3 py-2.5">
        <form onSubmit={sendMessage}>
          <input
            type="text"
            ref={inputRef}
            className="w-full bg-actions-light outline-none text-actions-message"
            placeholder="Enter a message"
            onChange={handleOnChange}
            value={message}
          />
        </form>
      </div>
    </div>
  );
};

export default ChatBottomActions;

interface IChatBottomActions {
  currentChatId: string;
}
