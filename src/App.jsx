import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ChatBox from "./components/ChatBox";

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

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

  return <ChatBox user={user} />;
}

export default App;
