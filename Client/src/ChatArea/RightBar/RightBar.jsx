import React, { useEffect } from "react";
import styles from "./RightBar.module.css";
import RightMainScreen from "./RightMainScreen/RightMainScreen";
import RightTitleBar from "./RightTitleBar/RightTitleBar";
/**
 *@argument {String} name
 * @param {String} name
 * @description Name of the room
 *  @param {String} id
 * @description ID of the room
 *  @param {String} profilePicture
 * @description Base64 Encoded Image of the room
 *  @param {Array} messageList
 * @description All the messages in format {name,message,isImage,sentTime}
 *
 */
function RightBar({
  name,
  id,
  profilePicture,
  messageList_,
  userName,
  onMessageSent,
  onUserAddtoRoomClicked,
}) {
  return (
    <div className={styles.RightBar}>
      {id ? (
        <React.Fragment>
          <div>
            <RightTitleBar
              userName={name}
              userProfileImage={profilePicture}
              onUserAdd={onUserAddtoRoomClicked}
            ></RightTitleBar>
          </div>
          <div>
            <RightMainScreen
              messageList={messageList_}
              userName={userName}
              onSent={onMessageSent}
            ></RightMainScreen>
          </div>
        </React.Fragment>
      ) : (
        <h2 className={styles.Error}></h2>
      )}
    </div>
  );
}
export default RightBar;
