import React, { useState } from "react";
import styles from "./Register.module.css";
import RegisterImage from "./Images/Register.svg";
import { useHistory } from "react-router-dom";
function Register({ onSubmit }) {
  const [username, updateusername] = useState("");
  const [password, updatepassword] = useState("");
  const [profilePicture, updateprofilePicture] = useState(null);
  const [message, updateMessage] = useState("");
  const history = useHistory();

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!(username && profilePicture && password)) {
      updateMessage("Please make sure that all the fields are filled");
    } else {
      onSubmit(username, password, profilePicture, history, (error) => {
        updateMessage(error);
      });
    }
  };
  return (
    <div className={styles.Register}>
      <div></div>
      <div className={styles.maincard}>
        <div>
          <h1 className={styles.Heading}>Register</h1>
        </div>
        <div>
          <form className={styles.Form} onSubmit={onFormSubmit}>
            <input
              type={"text"}
              value={username}
              onChange={(e) => {
                updateusername(e.target.value);
              }}
              placeholder={"Username"}
            ></input>{" "}
            <br></br>
            <input
              type={"password"}
              value={password}
              onChange={(e) => {
                updatepassword(e.target.value);
              }}
              placeholder={"Password"}
            ></input>
            <br></br>
            <input
              type="file"
              onChange={(e) => {
                updateprofilePicture(e.target.files[0]);
              }}
            ></input>
            <input
              type="Submit"
              value="Submit"
              className={styles.Submit}
            ></input>
          </form>
        </div>
        <div>
          <h1 className={styles.Error}>{message}</h1>
        </div>
      </div>
      <img src={RegisterImage} className={styles.Image} alt={""}></img>
    </div>
  );
}
export default Register;
