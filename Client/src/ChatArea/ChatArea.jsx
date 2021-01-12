import React, { useEffect, useState } from "react";
import { CredentialValue } from "../DataLayers/UserCredentials/Credentials";
import {
  initUserConnections,
  createRoom_networkCall,
  getRoom_NetworkCall,
  sendMessagetoServer,
  getChatsfromNetwork,
  addUsertoRoomNetwork,
} from "../Network/Networks";
import { disconnectSocket, emitSocketRoomJoined } from "../Network/Sockets";

import styles from "./ChatArea.module.css";
import LeftBar from "./LeftBar/LeftBar";
import RightBar from "./RightBar/RightBar";
/**
 *
 * @param {Object} userData
 * @description An object of format :{userName, userprofileImage, userId}
 */
function ChatArea({}) {
  const [storedCredentials, triggerCredentials] = CredentialValue();
  const [rooms, updateRooms] = useState([]);
  const [selectedRoomDetails, updateSelectedRoomDetails] = useState({});
  const [messageList, updateMessageList] = useState([]);

  //Function that will execute when the user add button will be clicked
  const onUserAdd = (e) => {
    var roomName = prompt("Enter the room name");
    var profilePicture = storedCredentials.userProfileImage;
    createRoom_networkCall(
      storedCredentials.userId,
      profilePicture,
      roomName,
      (element) => {
        const newData = {
          name: element.roomName,
          profileImage: element.profilePicture,
          id: element.roomId,
        };
        updateRooms([...rooms, newData]);
        alert("Room created sucessfully");
      },
      (error) => {
        console.log(error);
        alert(JSON.stringify(error));
      }
    );
  };
  //Function that will execute when the message is to be sent
  const onMessageSent = (message) => {
    if (Object.keys(selectedRoomDetails)?.length > 0) {
      const data_to_send = {
        message: message,
        owner: storedCredentials.userName,
        roomid: selectedRoomDetails.id,
      };

      sendMessagetoServer(
        data_to_send,
        (data) => {},
        (err) => {
          console.error(err);
        }
      );
    }
  };
  //Function that will execute when user will be added to the room
  const onUserAddtoRoom = () => {
    const username = prompt("Enter the username[Case Sensetive]", "");
    if (username) {
      addUsertoRoomNetwork(
        selectedRoomDetails.id,
        username,
        () => {
          alert("User has been successfully added to the room");
        },
        (message) => {
          alert("An error occured:\n" + message);
        }
      );
    }
  };

  useEffect(() => {
    return () => {
      disconnectSocket();
    };
  }, []);

  useEffect(() => {
    getRoom_NetworkCall((data) => {
      var newData = [];
      data.forEach((element) => {
        newData.push({
          name: element.roomName,
          profileImage: element.profilePicture,
          id: element.roomId,
        });
      });
      updateRooms(newData);
    });
  }, []);
  useEffect(() => {
    initUserConnections(() => {
      console.log("Error in initializing socket connections");
    });
  }, []);
  useEffect(() => {
    console.log("Message List has been updated");
    console.log(messageList);
    console.log(messageList.length);
  }, [messageList]);
  useEffect(() => {
    if (Object.keys(selectedRoomDetails).length > 0) {
      getChatsfromNetwork(selectedRoomDetails.id, (data) => {
        if (data?.length > 0) {
          emitSocketRoomJoined(selectedRoomDetails.id, (data_) => {
            console.log("In emit socket room message list");
            console.log(...messageList);
            updateMessageList([...messageList, data_]);
          });
          updateMessageList(data);
        }
      });
    }
  }, [selectedRoomDetails]);

  return (
    <div className={styles.ChatArea}>
      <div className={styles.ChatArea_1}>
        <LeftBar
          userName={storedCredentials.userName}
          userprofileImage={storedCredentials.userProfileImage}
          onUserAdd={onUserAdd}
          profilesList={rooms}
          onRoomChange={updateSelectedRoomDetails}
        ></LeftBar>
      </div>
      <div className={styles.ChatArea_2}>
        {selectedRoomDetails ? (
          <RightBar
            name={selectedRoomDetails.name}
            id={selectedRoomDetails.id}
            profilePicture={selectedRoomDetails?.profilePicture}
            userName={storedCredentials.userName}
            onMessageSent={onMessageSent}
            messageList_={messageList}
            onUserAddtoRoomClicked={onUserAddtoRoom}
          ></RightBar>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default ChatArea;
