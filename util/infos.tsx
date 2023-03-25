import axios from "axios";

const apiUrl = "https://api.multiversx.com";
const myAddress =
  "erd1a96qqf72tjnv9wrxz8mqgue7x6wr2wjy7ryxga6m5ep723j6d95q6qrlhx";
const type = "accounts";
const providers = "providers";

export interface Provider {
    provider: string;
    owner: string;
    serviceFee: number;
    delegationCap: string;
    apr: number;
    numUsers: number;
    cumulatedRewards: string;
    identity: string;
    numNodes: number;
    stake: string;
    topUp: string;
    locked: string;
    featured: boolean;
  }

export async function getUserName() {
  return axios
    .get(`${apiUrl}/${type}/${myAddress}`)
    .then((response) => {
      const username = response.data.username.replace(".elrond", "");
      console.log(`Username: ${username}`);
      return username;
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function getTotalEgld() {
  const [available, stake, rewards] = await Promise.all([
    getAvailableEgld(),
    getStakedEgld(),
    getRewardsEgld(),
  ]);
  const total =
    (Number((available / 10 ** 18)) +
    Number((stake / 10 ** 18)) +
    Number((rewards / 10 ** 18))).toFixed(2);
  console.log(`Total Egld: ${total}`);
  return total.toString();
}

export async function getAvailableEgld() {
  return axios
    .get(`${apiUrl}/${type}/${myAddress}`)
    .then((response) => {
      const available_balance = response.data.balance;
      console.log(`Available Egld: ${available_balance}`);
      return available_balance;
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function getStakedEgld() {
  return axios
    .get(`${apiUrl}/${type}/${myAddress}/delegation`)
    .then((response) => {
      const staked_balance = response.data[0].userActiveStake;
      console.log(`Staked Egld: ${staked_balance}`);
      return staked_balance;
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function getRewardsEgld() {
  return axios
    .get(`${apiUrl}/${type}/${myAddress}/delegation`)
    .then((response) => {
      const reward_balance = response.data[0].claimableRewards;
      console.log(`Rewards Egld: ${reward_balance}`);
      return reward_balance;
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function getProvidersList(): Promise<[key: string, identity: string][]> {
    return axios
    .get(`${apiUrl}/${providers}`)
    .then((response) => {
      const my_response = response.data;
      const result: [key: string, identity: string][] = [];
      let key = 0;
      my_response.forEach((item: Provider) => {
        result.push([`${key++}. `, item.identity]);
      });
      console.log(result);
      return result;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
}