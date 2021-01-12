import React from "react";
import styles from "./LeftBar.module.css";
import LeftTitleBar from "./LeftTitleBar/LeftTitleBar";
import ProfileDisplayComponent from "./ProfileDisplayComponent/ProfileDisplayComponent";
/**
 *
 * @param {String} userName
 * @description The name of the user
 *
 * @param {String} userprofileImage
 * @description A base64 encoded image
 *
 * @param {String} userId
 * @description The id of the user
 *
 * @param {Array<Object>} profileList
 * @description An array of the objects  in format '{name , id , profileImage , lastdate}' for the other linked users
 */
function LeftBar({
  userName,
  userprofileImage,
  onRoomChange,
  profilesList,
  onUserAdd,
}) {
  return (
    <div className={styles.LeftBar}>
      <LeftTitleBar
        userName={userName}
        userProfileImage={userprofileImage}
        userAddClicked={onUserAdd}
      ></LeftTitleBar>
      <div className={styles.ProfileDisplay}>
        {profilesList
          ? profilesList.map((element) => {
              return (
                <ProfileDisplayComponent
                  components={element}
                  key={element.id}
                  onRoomChange={onRoomChange}
                ></ProfileDisplayComponent>
              );
            })
          : ""}
      </div>
    </div>
  );
}
export default LeftBar;
