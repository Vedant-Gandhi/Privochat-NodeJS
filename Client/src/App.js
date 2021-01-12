import "./App.css";
import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Register from "./Register/Register";
import { apiCalls, internalApiCalls } from "./Configs";
import { RegisterUser, userLogin } from "./Network/Networks";
import Login from "./Login/Login";
import ChatArea from "./ChatArea/ChatArea";
import {
  CredentialsUpdateFormatter,
  CredentialValue,
} from "./DataLayers/UserCredentials/Credentials";
import MainScreen from "./MainScreen/MainScreen";

function App() {
  const [{}, credentialsTrigger] = CredentialValue();

  const onRegister = (
    username,
    password,
    profilePicture,
    history,
    failureFunc
  ) => {
    let reader = new FileReader();
    reader.readAsDataURL(profilePicture);
    reader.onload = () => {
      const data = reader.result;
      RegisterUser(
        username,
        password,
        data,
        () => {
          history.push(apiCalls.LOGIN_USER);
        },
        failureFunc
      );
    };
    reader.onerror = (error) => {
      console.log(error);
      failureFunc("Unable to process the Image");
    };
  };
  const onLogin = (username, password, failure, history) => {
    userLogin(
      username,
      password,
      (data) => {
        credentialsTrigger(
          CredentialsUpdateFormatter(data.username, data.profilePicture)
        );
        history.push(internalApiCalls.CHAT_SCREEN);
      },
      failure
    );
  };
  return (
    <React.StrictMode>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact>
              <MainScreen
                LoginPath={apiCalls.LOGIN_USER}
                RegistrationPath={apiCalls.REGISTER_USER}
              ></MainScreen>
            </Route>
            <Route path={apiCalls.REGISTER_USER} exact>
              <Register onSubmit={onRegister}></Register>
            </Route>
            <Route path={apiCalls.LOGIN_USER} exact>
              <Login onSubmit={onLogin}></Login>
            </Route>
            <Route path={internalApiCalls.CHAT_SCREEN} exact>
              <ChatArea></ChatArea>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </React.StrictMode>
  );
}
//userName, userprofileImage, userId,
/*
 userName: userName || "",
    userProfileImage: userProfileImage || "",
    userId: userId || "",
    token: token || null,
    */
export default App;
