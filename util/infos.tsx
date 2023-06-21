import axios from "axios";

const apiUrl = "https://api.multiversx.com";
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

export interface Nft {
  identifier: string;
  collection: string;
  attributes: string;
  nonce: number;
  type: string;
  name: string;
  creator: string;
  royalties: number;
  uris: string[];
  url: string;
  media: {
    url: string;
    fileSize: number;
    fileType: string;
    originalUrl: string;
    thumbnailUrl: string;
  }[];
  isWhitelistedStorage: boolean;
  tags: string[];
  metadata: {
    description: string;
    dna: string;
    attributes: {
      trait_type: string;
      value: string;
    }[];
    compiler: string;
    rarity: {
      avgRarity: number;
      statRarity: number;
      rarityScore: number;
      rarityScoreNormed: number;
      usedTraitsCount: number;
    };
    createdAt: number;
  };
  ticker: string;
  score: number;
  rank: number;
  isNsfw: boolean;
  assets: {
    website: string;
    description: string;
    status: string;
    pngUrl: string;
    svgUrl: string;
  };
}

export async function getUserName(myAddress: string) {
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

export async function getTotalEgld(myAddress: string) {
  const [available, stake, rewards] = await Promise.all([
    getAvailableEgld(myAddress),
    getStakedEgld(myAddress),
    getRewardsEgld(myAddress),
  ]);
  const total = (Number(available) + Number(stake) + Number(rewards)).toFixed(
    2
  );
  console.log(`Total Egld: ${total}`);

  const egldData = {
    total: total.toString(),
    available: available.toFixed(2).toString(),
    stake: stake.toFixed(2).toString(),
    rewards: rewards.toFixed(2).toString(),
  };

  return egldData;
}

export async function getAvailableEgld(myAddress: string): Promise<number> {
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

export async function getStakedEgld(myAddress: string) {
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

export async function getRewardsEgld(myAddress: string) {
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

export async function getStakedEgldProviders(
  myAddress: string
): Promise<{ address: string; userActiveStake: string }[]> {
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
      return userActiveStakeAddresses;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export async function getNfts(myAddress: string): Promise<string[]> {
  return axios
    .get(`${apiUrl}/${type}/${myAddress}/nfts`)
    .then((response) => {
      const urls = response.data.reduce((acc: string[], nft: Nft) => {
        if (nft.url) {
          acc.push(nft.url);
        }
        return acc;
      }, []);
      console.log(urls);
      return urls;
    })
    .catch((error) => {
      console.error(error);
    });
}
