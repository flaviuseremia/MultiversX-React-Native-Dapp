import React, { createContext, useState } from "react";

interface UserContextType {
  username: string;
  availableBalance: string;
  setUsername: (username: string) => void;
  setAvailableBalance: (availableBalance: string) => void;
}

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserContext = createContext<UserContextType>({
  username: "",
  availableBalance: "",
  setUsername: () => {},
  setAvailableBalance: () => {},
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [username, setUsername] = useState("");
  const [availableBalance, setAvailableBalance] = useState("");

  const value = {
    username: username,
    availableBalance: availableBalance,
    setUsername: setUsername,
    setAvailableBalance: setAvailableBalance,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
