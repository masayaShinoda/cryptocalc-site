import { useState, useEffect } from "react"
import makeRequest from "../utils/makeRequest"
import dateFormat from "../utils/dateFormat"

export default function valueInfo({ coin, coinOptions }) {
    console.log(coin)
    const [apiData, setApiData] = useState(null)
    
    let requestUrl = 
    `https://api.coingecko.com/api/v3/simple/price?ids=` + 
    `${coinOptions.join()}` +
    `&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`

    const MINUTE_MS = 60000;
        // get value every minute
    useEffect(() => {
        makeRequest(requestUrl).then(value => {setApiData(value)})
    }, [coin])
    useEffect(() => {
        const interval = setInterval(() => {
            makeRequest(requestUrl).then(value => {setApiData(value)})
            console.log("1 minute update")
        }, MINUTE_MS );
        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])

    return (
        <div>
            <h2>{coin}</h2>
            {apiData ? 
                (<ul>
                    <li key="USD value">
                        <p>USD value:</p>
                        <p id="coin-usd-value">${apiData[coin]["usd"]}</p>
                    </li>
                    <li key="Last updated">
                        <p>Last updated:</p>
                        <p>{dateFormat(apiData[coin]["last_updated_at"])}</p>
                    </li>
                </ul>)
            : null}
        </div>
    )
}