import React, { useState, useEffect, useRef } from "react";
import { fetchMessages, sendMessage } from "../api";

const ChatBox = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const wsRef = useRef(null);

  // Load existing messages on mount
  useEffect(() => {
    const loadMessages = async () => {
      const msgs = await fetchMessages();
      setMessages(msgs); // Set the full history initially
    };

    loadMessages();

    // Open WebSocket connection
    const socket = new WebSocket("ws://localhost:4567/ws");
    wsRef.current = socket;

    socket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages(prev => [...prev, newMessage]); // Add new incoming messages
    };

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => socket.close();
  }, []);

  const handleSend = async () => {
    if (content.trim()) {
      await sendMessage(user.id, content);
      setContent("");
    }
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
