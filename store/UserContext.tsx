import React, { createContext, useState, Dispatch, SetStateAction } from "react";

interface UserContextType {
  username: string;
  availableBalance: string;
  stakedBalance: string;
  setUsername: (username: string) => void;
  setAvailableBalance: Dispatch<SetStateAction<string>>;
  setStakedBalance: Dispatch<SetStateAction<string>>;
}

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserContext = createContext<UserContextType>({
  username: "",
  availableBalance: "",
  stakedBalance: "",
  setUsername: () => {},
  setAvailableBalance: () => {},
  setStakedBalance: () => {},
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [username, setUsername] = useState("");
  const [availableBalance, setAvailableBalance] = useState("");
  const [stakedBalance, setStakedBalance] = useState("");

  const value = {
    username: username,
    availableBalance: availableBalance,
    stakedBalance: stakedBalance,
    setUsername: setUsername,
    setAvailableBalance: setAvailableBalance,
    setStakedBalance: setStakedBalance,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
