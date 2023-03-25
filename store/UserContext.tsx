import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface UserContextType {
  username: string;
  availableBalance: string;
  stakedBalance: string;
  rewardsBalance: string;
  setUsername: (username: string) => void;
  setAvailableBalance: Dispatch<SetStateAction<string>>;
  setStakedBalance: Dispatch<SetStateAction<string>>;
  setRewardsBalance: Dispatch<SetStateAction<string>>;
}

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserContext = createContext<UserContextType>({
  username: "",
  availableBalance: "",
  stakedBalance: "",
  rewardsBalance: "",
  setUsername: () => {},
  setAvailableBalance: () => {},
  setStakedBalance: () => {},
  setRewardsBalance: () => {},
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [username, setUsername] = useState("");
  const [availableBalance, setAvailableBalance] = useState("");
  const [stakedBalance, setStakedBalance] = useState("");
  const [rewardsBalance, setRewardsBalance] = useState("");

  const value = {
    username: username,
    availableBalance: availableBalance,
    stakedBalance: stakedBalance,
    rewardsBalance: rewardsBalance,
    setUsername: setUsername,
    setAvailableBalance: setAvailableBalance,
    setStakedBalance: setStakedBalance,
    setRewardsBalance: setRewardsBalance,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
