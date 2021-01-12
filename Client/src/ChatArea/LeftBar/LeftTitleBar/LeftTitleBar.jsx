import React from "react";
import styles from "./LeftTitleBar.module.css";
import settingsIcon from "../../ChatAreaIcons/add.svg";
function LeftTitleBar({ userProfileImage, userName, userAddClicked }) {
  return userName ? (
    <div className={styles.LeftTitleBar}>
      <div>
        <img
          src={userProfileImage || null}
          className={styles.Image}
          alt={""}
        ></img>
      </div>
      <div>
        <h2>{userName || "Default"}</h2>
      </div>
      <div>
        <img
          src={settingsIcon || null}
          className={styles.Image}
          alt={"Settings"}
          onClick={userAddClicked}
        ></img>
      </div>
    </div>
  ) : (
    <h2 className={styles.Error}>I found no credentials</h2>
  );
}
export default LeftTitleBar;
