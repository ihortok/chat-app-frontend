import React, { useEffect, useState } from "react";
import { createUser, sendMessage, fetchMessages } from "./api";

function App() {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    const msgs = await fetchMessages();
    setMessages(msgs);
  };

  const handleUserLogin = async () => {
    const newUser = await createUser("john", "john@example.com");
    setUser(newUser);
  };

  const handleSendMessage = async () => {
    if (!content || !user) return;
    await sendMessage(user.id, content);
    setContent("");
    loadMessages();
  };

  return (
    <div>
      <h1>Chat App</h1>
      {!user ? (
        <button onClick={handleUserLogin}>Login as John</button>
      ) : (
        <>
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
          <button onClick={handleSendMessage}>Send</button>
        </>
      )}
    </div>
  );
}

export default App;
