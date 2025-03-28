import React, { useState } from "react";
import { signup } from "../api";

const SignupForm = ({ onSignup }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const user = await signup(username, email, password);
    if (user.id) onSignup(user);
    else alert(user.error || "Signup failed");
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSubmit}>Sign Up</button>
    </div>
  );
};

export default SignupForm;
