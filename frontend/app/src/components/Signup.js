import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../utils/api";

function Signup({ setLoggedIn }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await postData(`${apiUrl}/register/`, {
      username: username,
      email: email,
      password: password,
    });

    if (response.ok) {
      setLoggedIn(true);
      navigate("/profile");
    } else {
      alert("Failed to register!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;
