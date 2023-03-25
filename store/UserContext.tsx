import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface UserContextType {
  username: string;
  totalBalance: string;
  availableBalance: string;
  stakedBalance: string;
  rewardsBalance: string;
  setUsername: (username: string) => void;
  setTotalBalance: Dispatch<SetStateAction<string>>;
  setAvailableBalance: Dispatch<SetStateAction<string>>;
  setStakedBalance: Dispatch<SetStateAction<string>>;
  setRewardsBalance: Dispatch<SetStateAction<string>>;
}

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserContext = createContext<UserContextType>({
  username: "",
  totalBalance: "",
  availableBalance: "",
  stakedBalance: "",
  rewardsBalance: "",
  setUsername: () => {},
  setTotalBalance: () => {},
  setAvailableBalance: () => {},
  setStakedBalance: () => {},
  setRewardsBalance: () => {},
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [username, setUsername] = useState("");
  const [totalBalance, setTotalBalance] = useState("");
  const [availableBalance, setAvailableBalance] = useState("");
  const [stakedBalance, setStakedBalance] = useState("");
  const [rewardsBalance, setRewardsBalance] = useState("");

  const value = {
    username: username,
    totalBalance: totalBalance,
    availableBalance: availableBalance,
    stakedBalance: stakedBalance,
    rewardsBalance: rewardsBalance,
    setUsername: setUsername,
    setTotalBalance: setTotalBalance,
    setAvailableBalance: setAvailableBalance,
    setStakedBalance: setStakedBalance,
    setRewardsBalance: setRewardsBalance,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
