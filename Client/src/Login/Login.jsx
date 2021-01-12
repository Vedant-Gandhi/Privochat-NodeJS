import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Login.module.css";
function Login({ onSubmit }) {
  const history = useHistory();
  const [username, updateUsername] = useState("");
  const [password, updatePassoword] = useState("");
  const [error, updateError] = useState("");
  const failure = (msg) => {
    updateError(msg);
  };
  const onFormSubmit = (e) => {
    updateError("");
    e.preventDefault();
    if (username && password) {
      onSubmit(username, password, failure, history);
    }
  };
  return (
    <div className={styles.Login}>
      <div></div>
      <div className={styles.LoginCard}>
        <div>
          <h1 className={styles.Heading}>Login</h1>
        </div>
        <div>
          <form onSubmit={onFormSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                e.preventDefault();
                updateUsername(e.target.value);
              }}
            ></input>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                e.preventDefault();
                updatePassoword(e.target.value);
              }}
            ></input>
            <input
              type="Submit"
              defaultValue="Login"
              className={styles.Submit}
            ></input>
          </form>
        </div>
        <div style={{ overflow: "auto" }}>
          <h1 className={styles.Error}>{error}</h1>
        </div>
      </div>
      <div></div>
    </div>
  );
}
export default Login;
