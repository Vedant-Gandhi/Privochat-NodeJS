import { createContext, useContext, useReducer } from "react";
export const CredentialsFormatter = (userName, userProfileImage) => {
  return {
    userName: userName || "",
    userProfileImage: userProfileImage || "",
  };
};
export const CredentialsUpdateFormatter = (userName, userProfileImage) => {
  return {
    ...CredentialsFormatter(userName, userProfileImage),
    operation: CredentialStorageOps.UPDATE,
  };
};

export const CredentialStorage = createContext();

export const CredentialStorageProvider = ({
  defaultValue,
  reducer,
  children,
}) => (
  <CredentialStorage.Provider value={useReducer(reducer, defaultValue)}>
    {children}
  </CredentialStorage.Provider>
);
export const CredentialValue = () => useContext(CredentialStorage);

export const CredentialsDefaultValue = CredentialsFormatter();
export const CredentialStorageOps = {
  UPDATE: "UPDATE_DATA",
};

export const CredentialStorageReducer = (previousState, newState) => {
  switch (newState.operation) {
    case CredentialStorageOps.UPDATE:
      return {
        ...previousState,
        userName: newState.userName,
        userProfileImage: newState.userProfileImage,
      };
    default:
      return previousState;
  }
};
