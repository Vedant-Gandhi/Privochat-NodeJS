import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./MainScreen.module.css";
function MainScreen({ LoginPath, RegistrationPath }) {
  const hist = useHistory();
  return (
    <div className={styles.MainScreen}>
      <div className={styles.MenuBar}>
        <button
          className={styles.Button}
          onClick={(e) => {
            e.preventDefault();
            hist.push(RegistrationPath);
          }}
        >
          Register
        </button>
        <button
          className={styles.Button}
          onClick={(e) => {
            e.preventDefault();
            hist.push(LoginPath);
          }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
export default MainScreen;
