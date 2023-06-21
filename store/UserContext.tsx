import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface UserContextType {
  username: string;
  address: string;
  totalBalance: string;
  availableBalance: string;
  stakedBalance: string;
  rewardsBalance: string;
  providers: { key: string; value: string };
  setUsername: (username: string) => void;
  setAddress: Dispatch<SetStateAction<string>>;
  setTotalBalance: Dispatch<SetStateAction<string>>;
  setAvailableBalance: Dispatch<SetStateAction<string>>;
  setStakedBalance: Dispatch<SetStateAction<string>>;
  setRewardsBalance: Dispatch<SetStateAction<string>>;
  setProviders: (providers: { key: string; value: string }) => void;
}

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserContext = createContext<UserContextType>({
  username: "",
  address: "",
  totalBalance: "",
  availableBalance: "",
  stakedBalance: "",
  rewardsBalance: "",
  providers: { key: "", value: "" },
  setUsername: () => {},
  setAddress: () => {},
  setTotalBalance: () => {},
  setAvailableBalance: () => {},
  setStakedBalance: () => {},
  setRewardsBalance: () => {},
  setProviders: () => {},
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [totalBalance, setTotalBalance] = useState("");
  const [availableBalance, setAvailableBalance] = useState("");
  const [stakedBalance, setStakedBalance] = useState("");
  const [rewardsBalance, setRewardsBalance] = useState("");
  const [providers, setProviders] = useState<{ key: string; value: string }>({
    key: "",
    value: "",
  });

  const value = {
    username: username,
    address: address,
    totalBalance: totalBalance,
    availableBalance: availableBalance,
    stakedBalance: stakedBalance,
    rewardsBalance: rewardsBalance,
    providers: providers,
    setUsername: setUsername,
    setAddress: setAddress,
    setTotalBalance: setTotalBalance,
    setAvailableBalance: setAvailableBalance,
    setStakedBalance: setStakedBalance,
    setRewardsBalance: setRewardsBalance,
    setProviders: setProviders,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
