import React, { useEffect, useState } from "react";
import Chat from "./Chat/Chat";
import styles from "./RightMainScreen.module.css";
import sendIcon from "../../ChatAreaIcons/send.svg";
//This function consist of the holder for the Right side of the chat area
function RightMainScreen({ messageList, userName, onSent }) {
  const [sendData, updatesendData] = useState("");

  return (
    <div className={styles.RightMainScreen}>
      <div className={styles.chatArea}>
        {
          //Maps if there are any messages
        }
        {messageList
          ? messageList.map((element) => (
              <Chat
                name={element.owner || ""}
                message={element.message}
                key={element._id}
                id={element._id}
                isSent={
                  userName.localeCompare(element.owner) === 0 ? true : false
                }
                Time={element.time}
              ></Chat>
            ))
          : ""}
      </div>
      <div className={styles.BottomBar}>
        <textarea
          autoCorrect={false}
          value={sendData}
          onChange={(e) => {
            updatesendData(e.target.value);
          }}
        ></textarea>
        <img
          src={sendIcon}
          className={styles.Image}
          style={{ marginLeft: "10px" }}
          onClick={(e) => {
            e.preventDefault();
            if (sendData && typeof onSent == "function") {
              onSent(sendData);
              updatesendData("");
            }
          }}
        ></img>
        <img src={null} className={styles.Image}></img>
      </div>
    </div>
  );
}
export default RightMainScreen;
