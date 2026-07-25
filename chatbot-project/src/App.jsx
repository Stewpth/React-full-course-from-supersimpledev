import { useState, useEffect, useRef } from "react";
import { Chatbot } from "supersimpledev";

import RobotProfileImage from "./assets/robot.png";
import UserProfileImage from "./assets/user.png";
import LoadingMessage from "./assets/loading-spinner.gif";
import "./App.css";

function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    const newChatMessages = [
      ...chatMessages,
      { message: inputText, sender: "user", id: crypto.randomUUID() },
      { message: <BotLoadingMessage />, sender: "robot", id: "loadingId" },
    ];
    setChatMessages(newChatMessages);
    // Instead using if-statement. we set it to true first because this function is Async.
    setIsLoading(true);

    // After the user sent a message. we can remove now the value of an input
    setInputText("");

    // Bot response
    const response = await Chatbot.getResponseAsync(inputText);

    // After received the response. need to change the last index of the array
    // and rerender again by setting the state again (setChatMessages)
    newChatMessages[newChatMessages.length - 1] = {
      message: response,
      sender: "robot",
      id: crypto.randomUUID(),
    };

    // we need spread operator to copy the value of newChatMessages and
    // paste the value to the new created array.
    setChatMessages([...newChatMessages]);
    // Sorry for my grammar. I'm weak at english

    // after everything is done. set it again into false.
    setIsLoading(false);
  }

  function handleSendButton(event) {
    if (event.key === "Enter") {
      sendMessage();
    } else if (event.key === "Escape") {
      setInputText("");
    }
  }

  return (
    <div className="chat-input-container">
      {isLoading ? (
        <input
          placeholder="Bot is thinking."
          size="30"
          value={inputText}
          disabled={true}
          className="chat-input"
        />
      ) : (
        <input
          placeholder="Send a message to a Chatbot"
          size="30"
          value={inputText}
          onChange={saveInputText}
          onKeyDown={handleSendButton}
          className="chat-input"
        />
      )}
      {isLoading ? (
        <button className="send-button">Wait</button>
      ) : (
        <button onClick={sendMessage} className="send-button">
          Send
        </button>
      )}
    </div>
  );
}

function BotLoadingMessage() {
  return <img src={LoadingMessage} className="loading-message" />;
}

function useAutoScroll(dependencies) {
  const containerRef = useRef(null);

  useEffect(() => {
    const containerElem = containerRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [dependencies]);

  return containerRef;
}

function ChatMessages({ chatMessages }) {
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

function ChatMessage({ message, sender }) {
  return (
    <div
      className={sender === "user" ? "chat-message-user" : "chat-message-robot"}
    >
      {sender === "robot" && (
        <img src={RobotProfileImage} className="chat-message-profile" />
      )}
      <div className="chat-message-text">{message}</div>
      {sender === "user" && (
        <img src={UserProfileImage} className="chat-message-profile" />
      )}
    </div>
  );
}

function EmptyMessageGreet() {
  return (
    <p className="welcome.message">
      Welcome to the chatbot project! Send a message using the textbox below.
    </p>
  );
}

function App() {
  const [chatMessages, setChatMessages] = useState([]);

  return (
    <div className="app-container">
      <ChatMessages
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
      {chatMessages.length === 0 && <EmptyMessageGreet />}
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App;
