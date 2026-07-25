import { useState, useEffect } from "react";
import { Chatbot } from "supersimpledev";

import ChatInput from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import EmptyMessageGreet from "./components/EmptyMessageGreet";

import "./App.css";

function App() {
  const [chatMessages, setChatMessages] = useState([]);

  // Chatbot.addResponses adds a response to the chatbot.
  // Ex: you message "greet" on the page, chatbot will response "hello".
  // Chatbot.addResponses can be string or function that returns string
  useEffect(() => {
    Chatbot.addResponses({
      greet: "hello",
      goodbye: "bye",
      "1 + 1": "nigga are you dumb? go kill yourself",
      "give me a random number": () => {
        return `Here's your number you stupid bitch ass ${Math.floor(Math.random() * 100)}`;
      },
    });
  }, []);

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
