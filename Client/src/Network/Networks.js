import { apiCalls } from "../Configs";
import Axios from "axios";
import { initSocket } from "./Sockets";
//The name for the storage of token in session storage
export const TOKEN_STORAGE_NAME = "privochat_Token";

//A function that registers the user on server
export function RegisterUser(
  username,
  password,
  base64Image,
  success,
  failure
) {
  let api = apiCalls;
  if (api) {
    if (
      username &&
      password &&
      base64Image &&
      typeof base64Image == "string" &&
      typeof username == "string" &&
      typeof password == "string"
    ) {
      SendNetworkPost(
        `${api.MAIN_DOMAIN}${api.REGISTER_USER}`,
        RegisterUserFormatter(username, password, base64Image),
        success,
        failure
      );
    } else {
      failure("All the parameters are required");
    }
  } else {
    failure("Api paths are not defined");
  }
}
//Formats the registeration data accordingly
function RegisterUserFormatter(username, password, Image) {
  return { username: username, password: password, profilepicture: Image };
}
//Function that sends the data to server for user auth
export function userLogin(username, password, success, failure) {
  const data = { username: username, password: password };
  SendLoginPost(
    `${apiCalls.MAIN_DOMAIN}${apiCalls.LOGIN_USER}`,
    data,
    success,
    failure
  );
}
/**
 *
 * @param {String} userid
 * @param {*} profilepicture
 * @param {*} roomname
 * @param {*} sucess
 * @param {*} failure
 */
//Rest API call to create a ROom
export function createRoom_networkCall(
  userid,
  profilepicture,
  roomname,
  sucess,
  failure
) {
  SendNetworkPost(
    `${apiCalls.MAIN_DOMAIN}${apiCalls.CREATE_NEW_ROOM}`,
    {
      userId: userid,
      profilepicture: profilepicture,
      roomname: roomname,
    },
    sucess,
    failure
  );
}
/**
 *
 * @param {String} userId
 * @description Returns an array of the rooms for specific user in format {roomId,roomName,profilePicture}
 */
//Rest API call to get a ROom
export function getRoom_NetworkCall(sucess, failure) {
  SendNetworkPost(
    `${apiCalls.MAIN_DOMAIN}${apiCalls.GET_ROOMS}`,
    {},
    (data) => {
      if (typeof sucess == "function") {
        sucess(data);
      }
    },
    (error) => {
      if (typeof failure == "function") {
        failure(error);
      }
    }
  );
}
//Rest API call to send a message to room
export const sendMessagetoServer = (data, success, failure) => {
  SendNetworkPost(
    `${apiCalls.MAIN_DOMAIN}${apiCalls.ADD_MESSAGE}`,
    data,
    success,
    failure
  );
};
//Rest API call to get all the chats from a room
export const getChatsfromNetwork = (roomId, sucess, failure) => {
  SendNetworkPost(
    `${apiCalls.MAIN_DOMAIN}${apiCalls.GET_CHATS}`,
    { roomid: roomId },
    sucess,
    failure
  );
};

/**
 * @description Function that will add the user to room by network request
 * @param {String} roomId
 * @param {String} userName
 * @param {Function} success
 * @description No parameters will be given
 * @param {Function} failure
 */
export const addUsertoRoomNetwork = (roomId, userName, success, failure) => {
  if (roomId && userName) {
    SendNetworkPost(
      `${apiCalls.MAIN_DOMAIN}${apiCalls.ADD_USER_TO_ROOM}`,
      { roomid: roomId, username: userName },
      success,
      failure
    );
  }
};
////Function that acts as a gateway for network requests so that the token can be added each time to the request
const SendNetworkPost = (url, data_to_Send, sucess, failure) => {
  const item = sessionStorage.getItem(TOKEN_STORAGE_NAME) || "";

  const headers = { authorization: "Bearer " + item };
  Axios.post(url, data_to_Send, { headers: headers })
    .then((data) => {
      const data_ = data.data;
      if (data_.isError) {
        console.log(data_.data.message);
        failure(data_.data.message);
      } else {
        sucess(data_.data);
      }
    })
    .catch((error) => {
      if (typeof failure === "function") {
        failure(error.message);
      }
    });
};
//Function which is a proxy for Login where there is no token
const SendLoginPost = (url, data_to_Send, sucess, failure) => {
  Axios.post(url, data_to_Send)
    .then((data) => {
      const data_ = data.data;
      if (data_.isError) {
        console.log(data_);
        failure(data_.data.message);
      } else {
        const data___ = data_.data.token;
        sessionStorage.setItem(TOKEN_STORAGE_NAME, data___);
        delete data_.data.token;
        delete data_.data.uid;

        sucess(data_.data);
      }
    })
    .catch((error) => {
      failure(error.toJSON().message);
    });
};
//It just initializes the sockets after login
export function initUserConnections() {
  initSocket();
}
