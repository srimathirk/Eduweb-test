import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function SignUp({ setUser }) {
  let history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(""); //displays error if password didnt match

  function handleSubmit(e) {
    e.preventDefault();

    // Check if passwords match
    if (password !== passwordConfirmation) {
      setError("Passwords do not match");
      // go back to "/" page if password do not match
      // history.push("/") 

      // Reset form fields
      setUsername("");
      setPassword("");
      setPasswordConfirmation("");

      return;
    }

    // Reset error state if passwords match
    setError("");

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
      // history.push("/");
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <label htmlFor="password">Password Confirmation</label>
        <input
          type="password"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="current-password"
        />
        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
