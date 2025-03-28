import React, { useState, useEffect } from "react";
import { fetchMessages, sendMessage } from "../api";

const ChatBox = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    const msgs = await fetchMessages();
    setMessages(msgs);
  };

  const handleSend = async () => {
    if (!content) return;
    await sendMessage(user.id, content);
    setContent("");
    loadMessages();
  };

  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <div>
        {messages.map((msg) => (
          <p key={msg.id}>
            <strong>{msg.user.username}:</strong> {msg.content}
          </p>
        ))}
      </div>
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatBox;
