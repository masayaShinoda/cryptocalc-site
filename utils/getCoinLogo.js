import axios from "axios"

export default async function getCoinLogo(coinId) {
    // API: https://cryptoicons.org/api/:style/:currency/:size/:color 
    const style = `color`, size = `200`
    const requestUrl =
    `https://cryptoicons.org/api/` +
    `${style}` + `/` +
    `${coinId}` + `/` +
    `${size}`

    // let res = await axios.get(requestUrl)
    // let data = res.data

    // console.log(requestUrl)
    return requestUrl
}