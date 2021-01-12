export const userRegistrationFormatter = (username, password, profilePic) => {
  if (username && password && profilePic) {
    if (
      typeof username == "string" &&
      typeof password == "string" &&
      typeof profilePic == "string"
    ) {
      return {
        username: username,
        password: password,
        profilepicture: profilePic,
      };
    }
  }
};
export const userLoginFormatter = (username, password) => {
  if (username && password) {
    if (typeof username == "string" && typeof password == "string") {
      return { username: username, password: password };
    }
  }
};
//Socket events
export const socketCalls = {
  JOIN_URL: "http://127.0.0.1:3001", //Main Domain
  INITIATE_REALTIME: "initiaterealtime", //Socket call to initialize server
  ROOM_JOINED: "roomjoined", //Socket call emitted when room is joined
  NEW_CHAT_RECEIVED: "newChat", //Socket call received when the new chat is received
};
//Api calls
export const apiCalls = {
  MAIN_DOMAIN: "http://127.0.0.1:3001",
  REGISTER_USER: "/api/v1/Registration",
  LOGIN_USER: "/api/v1/Login",
  CREATE_NEW_ROOM: "/api/v1/createnewroom",
  GET_ROOMS: "/api/v1/getRooms",
  ADD_MESSAGE: "/api/v1/addMessage",
  GET_CHATS: "/api/v1/getChats",
  ADD_USER_TO_ROOM: "/api/v1/addUsertoRoom",
};
//Internal APi CAlls that will not be used for network communication
export const internalApiCalls = {
  CHAT_SCREEN: "/ChatScreen",
};
