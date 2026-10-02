import ChatMessage from "./ChatMessage";
import useAutoScroll from "../hooks/useAutoScroll";

import "./ChatMessages.css";

type ChatMessagesProps = {
  chatMessages: { message: string; sender: string; id: string }[];
};

export default function ChatMessages({ chatMessages }: ChatMessagesProps) {
  const chatMessagesRef = useAutoScroll([chatMessages]);

  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id}
          />
        );
      })}
    </div>
  );
}
