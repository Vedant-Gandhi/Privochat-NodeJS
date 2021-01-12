const databaseConfigs = require("./DatabaseConfigs");
const mongoose = require("mongoose");
const Logger = require("./Log");

//TAG is defined for Logger
const TAG = "DATABASE_ACCESS_LAYER";

//THE Mongodb URL for initialization
const DATABASE_TOTAL_URL = `${databaseConfigs.DATABASE_URL}${databaseConfigs.DATABASE_NAME}`;
const credentialModel = new mongoose.model(
  databaseConfigs.CREDENTIALS_NAME,
  new mongoose.Schema(databaseConfigs.credentialsSchema)
);
const roomModel = new mongoose.model(
  databaseConfigs.ROOM_DB_NAME,
  new mongoose.Schema(databaseConfigs.roomSchema)
);
const chatModel = new mongoose.model(
  databaseConfigs.CHAT_DB_NAME,
  new mongoose.Schema(databaseConfigs.chatSchema)
);

function inititalizeDatabase(onSucess, onFailure) {
  mongoose
    .connect(DATABASE_TOTAL_URL, {
      autoIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      onSucess();
    })
    .catch((err) => {
      onFailure(err);
    });
}

function addNewUser(data, onSucess, onFailure) {
  if (credentialModel) {
    const newModel = new credentialModel(data);
    newModel.save((err, sucess) => {
      if (err) {
        onFailure(err);
      } else {
        onSucess(sucess);
      }
    });
  }
}

function verifyCredentials(data, onSucess, onFailure) {
  credentialModel.findOne(data, (err, docs) => {
    if (err) {
      onFailure(err);
    } else {
      onSucess(docs);
    }
  });
}
/**
 * DataFormat->{
 * roomName,profilePicture}
 */
function createNewRoom(userId, data, onSucess, onFailure) {
  const newroomModel = new roomModel({ userId: [userId], ...data });
  newroomModel.save((err, sucess) => {
    if (err) {
      onFailure(err);
    } else {
      const newchatModel = new chatModel({ roomId: sucess._id, data: [] });
      newchatModel.save((err, success) => {
        if (err) {
          roomModel.findByIdAndDelete(sucess._id, (err__, docs) => {
            if (err__) {
              onFailure(err__);
            } else {
              onFailure(err);
            }
          });
        } else {
          onSucess(sucess);
        }
      });
    }
  });
}
function getRooms(userId, sucess, failure) {
  roomModel.find({ userId: userId }, (error, docs) => {
    if (error) {
      failure(error);
    } else {
      sucess(docs);
    }
  });
}
function addNewChat(data, roomId, sucess, failure) {
  chatModel.updateMany(
    { roomId: roomId },
    {
      $push: {
        data: { message: data.message, owner: data.owner, time: data.time },
      },
    },
    (err, success) => {
      if (err) {
        failure(err);
      } else {
        sucess(success);
      }
    }
  );
}
function getChats(roomId, sucess, failure) {
  chatModel.findOne({ roomId: roomId }, "data", (error, result) => {
    if (error) {
      failure(error);
    } else {
      sucess(result);
    }
  });
}
/**
 *
 * @param {String} userName
 */
function addUsertoRoom(userName, roomId, sucess, failure) {
  if (userName?.length > 0) {
    userName = userName.trim();
    credentialModel.findOne({ username: userName }, (error, docs) => {
      if (error) {
        failure(error);
      } else {
        const id = docs._id.toString();
        roomModel.findByIdAndUpdate(
          roomId,
          { $push: { userId: id } },
          (error, docs) => {
            if (error) {
              failure(error);
            } else {
              sucess(docs);
            }
          }
        );
      }
    });
  }
}
function findRoomIDfromChatDatabase(chat_db_id, sucess, failure) {
  chatModel.findById(chat_db_id, "roomId", (error, success) => {
    if (error) {
      failure(error);
    } else {
      sucess(success);
    }
  });
}
module.exports = {
  inititalizeDatabase,
  addNewUser,
  verifyCredentials,
  createNewRoom,
  credentialModel,
  roomModel,
  chatModel,
  getRooms,
  addNewChat,
  findRoomIDfromChatDatabase,
  getChats,
  addUsertoRoom,
};
