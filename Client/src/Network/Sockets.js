import openSocket from "socket.io-client";
import { socketCalls } from "../Configs";
import { TOKEN_STORAGE_NAME } from "./Networks";
var socket = null;
//Call from socketCalls
export function initSocket(disconnectFunc) {
  console.log("Socket Initiated");
  socket = openSocket(socketCalls.JOIN_URL);

  socket.emit(
    socketCalls.INITIATE_REALTIME,
    sessionStorage.getItem(TOKEN_STORAGE_NAME)
  );
}
export function emitSocketRoomJoined(roomId, onChatReceived) {
  if (socket) {
    socket.emit(socketCalls.ROOM_JOINED, roomId);
    console.log("From emit socket room joined:" + roomId);

    socket.on(socketCalls.NEW_CHAT_RECEIVED, (data) => {
      console.log("New chat received");
      onChatReceived(data);
    });
  }
}
export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
  }
}
/**
 *
 * @param {Object} roomUpdated
 * @description -Format of the data received is {roomId,roomName,profilePicture}
 */
