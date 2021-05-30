import { useState, useEffect } from "react"
import makeRequest from "../utils/makeRequest"
import dateFormat from "../utils/dateFormat"
import valueInfoStyles from "../styles/valueInfo.module.css"

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
        <div className={valueInfoStyles.container}>
            <h2 className={valueInfoStyles.header}>{coin}</h2>
            {apiData ? 
                (<ul>
                    <li key="USD value" className={valueInfoStyles.value}>
                        <span>USD value: <small>(one coin)</small></span>
                        <p id="coin-usd-value">${apiData[coin]["usd"]}</p>
                    </li>
                    <li key="Last updated" className={valueInfoStyles.lastUpdated}>
                        <span>Last updated:</span>
                        <p>{dateFormat(apiData[coin]["last_updated_at"])}</p>
                    </li>
                </ul>)
            : null}
        </div>
    )
}