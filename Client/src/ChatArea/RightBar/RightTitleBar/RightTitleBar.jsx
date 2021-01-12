import React from "react";
import styles from "./RightTitleBar.module.css";
import settingsIcon from "../../ChatAreaIcons/add.svg";
function RightTitleBar({ userProfileImage, userName, onUserAdd }) {
  return (
    <div className={styles.RightTitleBar}>
      <div>
        <img
          src={userProfileImage || null}
          className={styles.Image + " " + styles.profilePicture}
        ></img>
      </div>
      <div>
        <h2>{userName || "Default"}</h2>
      </div>
      <div>
        <img
          src={settingsIcon}
          className={styles.Image}
          alt={"Options"}
          onClick={(e) => {
            e.preventDefault();
            onUserAdd();
          }}
        ></img>
      </div>
    </div>
  );
}
export default RightTitleBar;
