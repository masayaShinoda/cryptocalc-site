import axios from "axios"

export default async function getCryptoId(coin) {
    const requestUrl =
    `https://api.coingecko.com/api/v3/coins/` +
    `${coin}`

    let res = await axios.get(requestUrl)
    let data = res.data

    return data["symbol"]
}