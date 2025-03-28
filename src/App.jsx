import React, { useEffect, useState } from "react";
import { createUser, sendMessage, fetchMessages } from "./api";

function App() {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

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
        <div>
          <h2>Login / Signup</h2>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={async () => {
            const res = await fetch("http://localhost:4567/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username, email }),
            });
            const data = await res.json();
            if (res.ok) setUser(data);
            else alert(data.error || "Login failed");
          }}>
            Login / Sign Up
          </button>
        </div>
      ) : (
        <>
          <h2>Welcome, {user.username}!</h2>
          <h3>Messages</h3>
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
