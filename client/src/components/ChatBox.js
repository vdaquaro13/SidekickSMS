// src/components/ChatBox.js

import React from "react";
import ChatMessage from "./ChatMessage";

const ChatBox = ({ chatLog, handleSubmit, input, setInput, theme }) => {
  return (
    <section className={`chatbox ${theme}`}>
      <div className="chat-log">
        {chatLog.map((message) => (
        <ChatMessage key={message.id} message={message} theme={theme} />
        ))}
      </div>
      <div className="chat-input-holder">
        <form onSubmit={handleSubmit}>
          <input
            rows="1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="chat-input-textarea"
            placeholder="Let's go save the world!"
          ></input>
        </form>
      </div>
    </section>
  );
};

export default ChatBox;
