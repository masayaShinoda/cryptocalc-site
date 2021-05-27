import axios from "axios"

export default async function makeGetRequest(requestUrl) {
    let res = await axios.get(requestUrl)
    let data = res.data
    console.log(data)
    return data
}