import axios from "axios";

const apiUrl = "https://api.multiversx.com";
const myAddress = "erd1a96qqf72tjnv9wrxz8mqgue7x6wr2wjy7ryxga6m5ep723j6d95q6qrlhx";
const type = "accounts";

export async function getUserName() {
    return axios.get(`${apiUrl}/${type}/${myAddress}`).then(response => {
        const username = response.data.username.replace(".elrond","");
        console.log(`Username: ${username}`);
        return username;
    })
    .catch(error => {
        console.error(error);
    });
}

export async function getAvailableEgld() {
    return axios.get(`${apiUrl}/${type}/${myAddress}`).then(response => {
        const available_balance = response.data.balance;
        console.log(`Available Egld: ${available_balance}`);
        return available_balance;
    })
    .catch(error => {
        console.error(error);
    });
}

export async function getStakedEgld() {
    return axios.get(`${apiUrl}/${type}/${myAddress}/delegation`).then(response => {
        const staked_balance = response.data[0].userActiveStake;
        console.log(`Staked Egld: ${staked_balance}`);
        return staked_balance;
    })
    .catch(error => {
        console.error(error);
    });
}

export async function getRewardsEgld() {
    return axios.get(`${apiUrl}/${type}/${myAddress}/delegation`).then(response => {
        const reward_balance = response.data[0].claimableRewards;
        console.log(`Rewards Egld: ${reward_balance}`);
        return reward_balance;
    })
    .catch(error => {
        console.error(error);
    });
}
