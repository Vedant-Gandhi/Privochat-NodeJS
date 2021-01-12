//Mongoose schema for credential storage
const credentialsSchema = {
  username: { type: String, trim: true, required: true, unique: true },
  password: { type: String, trim: true, required: true },
  profilePicture: { type: String },
  rooms: { type: Array },
};
//Room schema for rooms data storage
const roomSchema = {
  userId: { type: Array },
  roomName: { type: String, trim: true, required: true },
  profilePicture: { type: String },
};
//store the chats
const chatStructureSchema = {
  message: { type: String, trim: true, required: true },
  owner: { type: String, trim: true, required: true },
  time: { type: String, trim: true, required: true },
};
//The chat collection
const chatSchema = {
  roomId: { type: String, required: true, unique: true },
  data: [chatStructureSchema],
};
//Normal configs
const DATABASE_NAME = "privochat";
const DATABASE_URL = "mongodb://127.0.0.1:27017/privochat?replicaSet=r0";

const CREDENTIALS_NAME = "UserDetails";
const ROOM_DB_NAME = "Rooms";
const CHAT_DB_NAME = "Chats";

module.exports = {
  credentialsSchema,
  DATABASE_NAME,
  DATABASE_URL,
  CREDENTIALS_NAME,
  ROOM_DB_NAME,
  CHAT_DB_NAME,
  chatSchema,
  roomSchema,
};
