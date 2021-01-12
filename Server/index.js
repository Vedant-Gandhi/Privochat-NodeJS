const express = require("express");
const server = express();
const httpserver = require("http").Server(server);
const cors = require("cors");
const env = require("dotenv");
const jwt = require("jsonwebtoken");
const { hashText, socketTokenVerification } = require("./security");
const databaseLayer = require("./DatabaseLayer");
const Logger = require("./Log");

const io = require("socket.io")(httpserver, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

const TAG = "INDEX.JS";

env.config();

var dateholder = new Date();

//Middlewares
server.use(cors());
server.use(express.json({ limit: "2mb" }));
server.use((req, res, next) => {
  const filters = ["/api/v1/Login", "/api/v1/Registration", "/home"];
  const path = req.path;

  var pathmatched = false;
  filters.forEach((element) => {
    if (path.match(element)) {
      next();
      pathmatched = true;
    }
  });

  if (!pathmatched) {
    const authheader = req.headers["authorization"];

    const token = authheader && authheader.split(" ")[1];
    if (token == null)
      return res
        .status(401)
        .send(errorApi({ message: "Authorization required" }));
    jwt.verify(token, process.env.JWT_TOKEN, (err, userId) => {
      if (err) {
        Logger.logError(TAG, err);
        return res
          .status(403)
          .send(errorApi({ message: "Authorization failed" }));
      }
      req.uid = userId.token;
      next();
    });
  }
});

server.post("/api/v1/Login", (req, res) => {
  const data = {
    username: req.body.username,
    password: hashText(req.body.password),
  };
  if (data.username && data.password) {
    databaseLayer.verifyCredentials(
      data,
      (docs) => {
        if (docs) {
          res.send(
            sucessApi({
              profilePicture: docs.profilePicture,
              token: jwt.sign({ token: docs._id }, process.env.JWT_TOKEN, {
                expiresIn: "7200s",
              }),
              username: docs.username,
            })
          );
        } else {
          res.send(errorApi({ message: "User unavaliable" }));
        }
      },
      (err) => {
        res.send(errorApi({ message: err.__message }));
      }
    );
  }
});
/**
 * API => {username:username,password:Password,profilepicture:Base64 Image}
 * 

 */

server.post("/api/v1/Registration", (req, res) => {
  const data = {
    username: req.body.username,
    password: hashText(req.body.password),
    profilePicture: req.body.profilepicture,
    rooms: [],
  };

  if (data.password && data.username) {
    databaseLayer.addNewUser(
      data,
      (data) => {
        res.send(sucessApi({}));
      },
      (error) => {
        error.code == 11000
          ? res.send(
              errorApi({
                message: "User already exists",
                code: 221,
              })
            )
          : res
              .status(500)
              .send(
                errorApi({ message: "Internal error has occcured", code: 500 })
              );
      }
    );
  }
});

server.post("/api/v1/createNewRoom", (req, res) => {
  const uid = req.uid;
  const data = {
    roomName: req.body.roomname,
    profilePicture: req.body.profilepicture,
  };
  databaseLayer.createNewRoom(
    uid,
    data,
    (docs) => {
      res.send(
        sucessApi({
          roomId: docs._id,
          roomName: docs.roomName,
          profilePicture: docs.profilePicture,
        })
      );
    },
    (err) => {
      Logger.logError(TAG, err);
      res.send(errorApi({ message: err._message, code: 114 }));
    }
  );
});
/** roomId: change.fullDocument._id,
      roomName: change.fullDocument.roomName,
      profilePicture: change.fullDocument.profilePicture, */
server.post("/api/v1/getRooms", (req, res) => {
  const uid = req.uid;

  databaseLayer.getRooms(
    uid,
    (docs) => {
      if (docs) {
        var sentdata = [];
        docs.forEach((element) => {
          sentdata.push({
            roomId: element._id,
            roomName: element.roomName,
            profilePicture: element.profilePicture,
          });
        });
        res.send(sucessApi(sentdata));
      }
    },
    (err) => {
      console.log(err);
      res.send(err);
    }
  );
});

server.post("/api/v1/addMessage", async (req, res) => {
  const data = req.body;
  var time = dateholder.toString();
  const roomId = data.roomid;
  const chatmsg = {
    message: data.message,
    owner: data.owner,
    time: time,
  };

  databaseLayer.addNewChat(
    chatmsg,
    roomId,
    (data) => {
      res.send(sucessApi(data));
    },
    (error) => {
      res.send(errorApi(error));
      Logger.logData("Failure", error);
    }
  );
});
server.post("/api/v1/getChats", (req, res) => {
  const uid = req.uid;
  const roomid = req.body.roomid;
  databaseLayer.getChats(
    roomid,
    (data) => {
      res.send(sucessApi(data?.data));
    },
    (error) => {
      res.send(errorApi(error));
    }
  );
});
databaseLayer.inititalizeDatabase(
  () => {
    Logger.logData(TAG, "Database Connected");
    httpserver.listen(3001);
  },
  (err) => {
    Logger.logError(TAG, err);
  }
);

server.post("/api/v1/addUsertoRoom", (req, res) => {
  const roomId = req.body.roomid;
  const userName = req.body.username;
  databaseLayer.addUsertoRoom(
    userName,
    roomId,
    (data) => {
      res.send(sucessApi({}));
    },
    (error) => {
      res.send(
        errorApi({ message: "Unable to add the user in room", code: 155 })
      );
    }
  );
});
//The format for network transfer
const networkTransferFormat = (isError, data) => {
  if (typeof data == "object" && typeof isError == "boolean") {
    return { isError: isError, data: data };
  }
};
//The format for RestAPI error
const errorApi = (data) => {
  if (typeof data == "object") {
    return networkTransferFormat(true, data);
  } else {
    throw "Data must be in object format";
  }
};
//The format for RestAPI sucess
const sucessApi = (data) => {
  if (typeof data == "object") {
    return networkTransferFormat(false, data);
  } else {
    throw "Data must be in object format";
  }
};

//Socket .IO Connections
var chatWatchers = null;
io.on("connection", (socket) => {
  console.log(`Socket is ${socket.id}`);
  socket.on("initiaterealtime", (token) => {
    socketTokenVerification(token);
    chatWatchers = databaseLayer.chatModel?.watch();
    chatWatchers = databaseLayer.chatModel?.watch();
  });
  //When the room is joined all previous rooms connections have to be removed
  socket.on("roomjoined", (roomId) => {
    console.log("Room Joined");
    console.log(socket.adapter.rooms);
    const keys = socket.adapter.rooms;
    for (const [key, _] of keys) {
      console.log(key);
      if (key.match("RoomID__")) {
        console.log("Left Socket::" + key);
        socket.leave(key);
      }
    }
    //Event emitted when any room is clicked on the client
    socket.join(`RoomID__${roomId}`);
    //MongoDB stream to watch the chat database
    chatWatchers?.on("change", (data) => {
      const updatedData = data.updateDescription.updatedFields;
      //Logger.logData("SOCKETROOMCHANGED", data.updateDescription.updatedFields);
      databaseLayer.findRoomIDfromChatDatabase(
        data.documentKey._id,
        (roomId) => {
          var tempo__ = [];
          for (d in updatedData) {
            tempo__.push(updatedData[d]);
            break;
          }
          io.to(`RoomID__${roomId.roomId}`).emit("newChat", tempo__[0]);
          console.log("Event emmited");
        }
      );
    });
  });
  //Remove the socket from all connected rooms for prevention of zombie entries
  socket.on("disconnecting", () => {
    const keys = socket.adapter.rooms;
    for (const [key, _] of keys) {
      console.log("Left :" + key);
      socket.leave(key);
    }
  });
  socket.on("disconnect", () => {
    Logger.logData(TAG, "User Disconnected" + JSON.stringify(socket.rooms));
  });
});
