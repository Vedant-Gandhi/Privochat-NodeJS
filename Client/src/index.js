import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  CredentialStorageProvider,
  CredentialsDefaultValue,
  CredentialStorageReducer,
} from "./DataLayers/UserCredentials/Credentials";

ReactDOM.render(
  <React.StrictMode>
    <CredentialStorageProvider
      defaultValue={CredentialsDefaultValue}
      reducer={CredentialStorageReducer}
    >
      <App />
    </CredentialStorageProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
//Themes
