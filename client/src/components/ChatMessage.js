// src/components/ChatMessage.js

import React from "react";

const ChatMessage = ({ message, theme }) => {
  return (
    <div className={`chat-message ${message.user === "gpt" && "chatgpt"} ${theme}`}>
      <div className="chat-message-center">
        <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}></div>
        <div className="message-container">
          <div className="message">{message.message}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
