import React, { useState, useEffect, useRef } from "react";
import { fetchMessages, sendMessage } from "../api";
import { formatTimestamp } from "../utils/date";

const ChatBox = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const wsRef = useRef(null);
  const bottomRef = useRef(null);

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

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (content.trim()) {
      await sendMessage(user.id, content);
      setContent("");
    }
  };  

  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <div style={{ display: "flex", flexDirection: "column", maxHeight: "500px", overflowY: "auto" }}>
        {messages.map((msg) => (
          <div
            style={{
              alignSelf: msg.user.id === user.id ? "flex-end" : "flex-start",
              maxWidth: "70%",
              display: "flex",
              flexDirection: "column"
            }}
            key={msg.id}
          >
            <div
              style={{
                backgroundColor: msg.user.id === user.id ? "#DCF8C6" : "#eee",
                padding: "8px 12px",
                margin: "6px 0",
                borderRadius: "10px",
                color: "#000"
              }}
            >
              <strong>{msg.user.username}</strong>
              <div>{msg.content}</div>
            </div>
            <p
              style={{
                fontSize: "0.8em",
                color: "#666",
                marginTop: "4px",
                alignSelf: msg.user.id === user.id ? "flex-end" : "flex-start"
              }}
            >
              {formatTimestamp(msg.created_at)}
            </p>
          </div>
        ))}
        <div ref={bottomRef} />
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
