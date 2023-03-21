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
