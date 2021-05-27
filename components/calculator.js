import React, {useState, useEffect} from "react"
import makeRequest from "../utils/makeRequest"
import ValueInfo from "../components/valueInfo"

function Calculator({ coin }) {
    const coinOptions = [
        "bitcoin",
        "dogecoin",
        "ethereum",
        "shiba-inu",
        "litecoin",
    ]

    let requestUrl = 
    `https://api.coingecko.com/api/v3/simple/price?ids=` + 
    `${coinOptions.join()}` +
    `&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`
    
    const [radio, setRadio] = useState(coinOptions[0])
    const [userInvestment, setUserInvestment] = useState(0) // in USD
    const [userInvestmentCoinCurrency, setUserInvestmentCoinCurrency] = useState(0)
    const [initialCoinPrice, setinitialCoinPrice] = useState(0) // in USD
    const [sellingCoinPrice, setSellingCoinPrice] = useState(0) // in USD
    const [investmentFee, setInvestmentFee] = useState(0)
    const [withdrawFee, setwithdrawFee] = useState(0)
    const [gainOrLoss, setGainOrLoss] = useState(0)
    const [totalReturn, setTotalReturn] = useState(0)
    
    let exchangeRate = 1/initialCoinPrice

    useEffect(() => {
        // call once to set value for initial coin price at the beginning
        makeRequest(requestUrl).then(value => {setinitialCoinPrice(value[radio]["usd"])})
        // btc/usd conversion
        
        setUserInvestmentCoinCurrency(userInvestment * exchangeRate)
    }, [])
    useEffect(() => {
        makeRequest(requestUrl).then(value => {setinitialCoinPrice(value[radio]["usd"])})
    }, [radio])
    useEffect(() => {
        setUserInvestmentCoinCurrency(userInvestment * exchangeRate)

        let ratioGainLoss = ( sellingCoinPrice / initialCoinPrice )
        setGainOrLoss((userInvestment * ratioGainLoss) - userInvestment)
        setTotalReturn((userInvestment * ratioGainLoss))

        // update gains/losses value everytime there is a change to inputs
    }, [radio, userInvestment, initialCoinPrice, sellingCoinPrice, investmentFee, withdrawFee])

    return (
        <div style={{ padding: `4.25vh 0`}}>
            <ValueInfo coin={radio} coinOptions={coinOptions} />
            <label htmlFor="userInvestment">Investment (USD)</label>
            <input 
                type="number" 
                value={userInvestment} 
                id="userInvestment"
                onChange={(e) => {setUserInvestment(e.target.value)}}
            />
            {userInvestmentCoinCurrency && 
                <p>{userInvestmentCoinCurrency} {radio}(s)</p>}
            <br />
            <label htmlFor="initialCoinPrice">Initial Coin Price (USD)</label>
            <input 
                type="number" 
                value={initialCoinPrice} 
                id="initialCoinPrice"
                onChange={(e) => {setinitialCoinPrice(e.target.value)}}
            />
            <label htmlFor="sellingCoinPrice">Selling Coin Price (USD)</label>
            <input 
                type="number" 
                value={sellingCoinPrice} 
                id="sellingCoinPrice"
                onChange={(e) => {setSellingCoinPrice(e.target.value)}}
            />
            <br />
            <label htmlFor="investmentFee">Investment Fee (USD)</label>
            <input 
                type="number" 
                value={investmentFee}
                id="investmentFee"
                onChange={(e) => {setInvestmentFee(e.target.value)}}
            />
            <label htmlFor="withdrawFee">Withdraw Fee (USD)</label>
            <input 
                type="number" 
                value={withdrawFee} 
                id="withdrawFee"
                onChange={(e) => {setwithdrawFee(e.target.value)}}
            />
            <div>
                {coinOptions.map(coinOption => (
                    <div>
                        <label>{coinOption}</label>
                        <input 
                            type="radio" 
                            checked={radio === coinOption}
                            value={coinOption}
                            onChange={(e) => {setRadio(e.target.value)}}
                        />
                    </div>
                ))}
            </div>
            <div>
                {/* profit or loss = (sellingCoinPrice - initialCoinPrice)/100 * initial investment */}
                <h2>Gains/losses: </h2>
                {gainOrLoss &&
                    (<h1>${gainOrLoss}</h1>)
                }
                <h3>Total: </h3>
                {totalReturn &&
                    (<p>${totalReturn}</p>)
                }
            </div>
        </div>
    )
}

export default Calculator