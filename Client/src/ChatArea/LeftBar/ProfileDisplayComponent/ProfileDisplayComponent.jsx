import React, { useEffect, useState } from "react";
import styles from "./ProfileDisplayComponent.module.css";
function ProfileDisplayComponent({ components, onRoomChange }) {
  const [id, updateId] = useState("");
  useEffect(() => {
    updateId(components.id);
  }, []);
  return (
    <div
      className={styles.ProfileDisplayComponent}
      onClick={(e) => {
        onRoomChange({
          id: components.id,
          name: components.name,
          profilePicture: components?.profileImage,
        });
      }}
    >
      <div>
        <img
          src={"" || components?.profileImage}
          className={styles.Image}
        ></img>
      </div>
      <div>
        <h3 className={styles.profileName}>{components?.name || "Null"}</h3>
      </div>
      <div>
        <h3 className={styles.date}>{components?.lastdate || ""}</h3>
      </div>
    </div>
  );
}
export default ProfileDisplayComponent;
//e object in format {name,id,profile,lastdate} for the other linked users
