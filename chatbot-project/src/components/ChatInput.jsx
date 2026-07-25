import { useState } from "react";
import { Chatbot } from "supersimpledev";
import LoadingMessage from "../assets/loading-spinner.gif";

import "./ChatInput.css";

function BotLoadingMessage() {
  return <img src={LoadingMessage} className="loading-message" />;
}

export default function ChatInput({ chatMessages, setChatMessages }) {
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
        <>
          <button onClick={sendMessage} className="send-button">
            Send
          </button>
          <button
            className="clear-button"
            onClick={() => {
              setChatMessages([]);
            }}
          >
            Clear
          </button>
        </>
      )}
    </div>
  );
}
