import React, { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ChatBox from "./components/ChatBox";

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("chatUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("chatUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("chatUser");
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return (
      <div>
        <h1>Chat App</h1>
        <div style={{ marginBottom: "1rem" }}>
          <button onClick={() => setShowLogin(true)}>Login</button>
          <button onClick={() => setShowLogin(false)}>Sign Up</button>
        </div>
        {showLogin ? (
          <LoginForm onLogin={setUser} />
        ) : (
          <SignupForm onSignup={setUser} />
        )}
      </div>
    );
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <ChatBox user={user} />
    </div>
  );
}

export default App;
