# Privochat-NodeJS

# Introduction
This project is developed for fun wih UI not being very good.All the code can e easily processed by anyone who  is reading it carefully.The logic is simple like of a real time chat application but using complete stack i.e MongoDB,ReactJS,NodeJS,ExpressJs

It includes concepts such as Socket.IO and MongoDB change Streams

All the configs for client side along with Rest API calls are stored in Config.JS

If you want to use just use npm install for both server and client and on the server side , in the .env file add a 64 bit hex key [Random]

# Logic
1:UserLogin-This occurs using a RestAPi

2.UserRegistration-This also occurs using the RestAPI

3.Chat Transfer-The chat message is sent using RestAPI and for receiveing the chat the client listens to the incoming events for particular room

4.Room Transfer-same logic as above

5.Addition of users in room-It is done in the database directly using RestAPI

# Database Structures
1. UserDetails -Stores the credentials of user
Structure:

        username:"String",

         password:"HashedString",

        profilePicture:"Base64 String"


2.Room Details-Stores information about rooms
Structure

        roomNameL:"String",

        roomProfile:"String",

        userAccess:[Array<UserId>],



3.Chat Details-Stores the chats
Structure



        roomId:[Array<String>]

        data:

        chatID
        chatTime
        chatMessage


# Image
![Screen Image](https://user-images.githubusercontent.com/45504169/104362201-85219700-5539-11eb-98c6-725d129ef80a.png)
