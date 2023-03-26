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

export interface UserStake {
  address: string;
  contract: string;
  userUnBondable: string;
  userActiveStake: string;
  claimableRewards: string;
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
  const total = (Number(available) + Number(stake) + Number(rewards)).toFixed(
    2
  );
  console.log(`Total Egld: ${total}`);
  return total.toString();
}

export async function getAvailableEgld(): Promise<number> {
  return axios
    .get(`${apiUrl}/${type}/${myAddress}`)
    .then((response) => {
      const available_balance = response.data.balance / 10 ** 18;
      console.log(`Available Egld: ${available_balance}`);
      return available_balance;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export async function getStakedEgld() {
  return axios
    .get(`${apiUrl}/${type}/${myAddress}/delegation`)
    .then((response) => {
      const staked_balance = response.data.reduce(
        (acc: number, cur: { userActiveStake: number }) =>
          acc + cur.userActiveStake / 10 ** 18,
        0
      );
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
      const reward_balance = response.data.reduce(
        (acc: number, cur: { claimableRewards: number }) =>
          acc + cur.claimableRewards / 10 ** 18,
        0
      );
      console.log(`Rewards Egld: ${reward_balance}`);
      return reward_balance;
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function getProvidersList(): Promise<
  [key: string, value: { name: string; address: string }][]
> {
  return axios
    .get(`${apiUrl}/${providers}`)
    .then((response) => {
      const my_response = response.data;
      const result: [key: string, value: { name: string; address: string }][] =
        [];
      let key = 0;
      my_response.forEach((item: Provider) => {
        if (item.identity !== undefined) {
          result.push([
            `${key++}. `,
            { name: item.identity, address: item.provider },
          ]);
        }
      });
      //console.log(result);
      return result;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
}

export async function getStakedEgldProviders(): Promise<
  { address: string; userActiveStake: string }[]
> {
  return axios
    .get(`${apiUrl}/${type}/${myAddress}/delegation`)
    .then((response) => {
      const userActiveStakeAddresses: {
        address: string;
        userActiveStake: string;
      }[] = response.data.map((entry: UserStake) => ({
        address: entry.contract,
        userActiveStake: entry.userActiveStake,
      }));
      //console.log(userActiveStakeAddresses);
      return userActiveStakeAddresses;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}
