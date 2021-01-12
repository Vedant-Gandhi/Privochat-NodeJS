import React, { useEffect } from "react";
import styles from "./Chat.module.css";
function Chat({ name, message, Time, isSent, id }) {
  return (
    <React.Fragment>
      {id ? (
        <div
          className={
            isSent ? `${styles.Chat} ${styles.Sent}` : `${styles.Chat}`
          }
        >
          <div
            className={styles.chatBox}
            style={
              isSent
                ? { backgroundColor: "#1a1a1a", color: "#fff" }
                : { color: "#1a1a1a" }
            }
          >
            <p style={{ userSelect: "none" }}> {name || "Anonymous"}</p>
            <p
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              {message}
            </p>
          </div>

          <div className={styles.Time}>
            <p>{Time || "Fetching"}</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}
export default Chat;
