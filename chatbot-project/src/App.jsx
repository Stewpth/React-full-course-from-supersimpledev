import { useState } from "react";

import ChatInput from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import EmptyMessageGreet from "./components/EmptyMessageGreet";

import "./App.css";

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
