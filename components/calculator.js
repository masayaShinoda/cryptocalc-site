import React, {useState, useEffect} from "react"
import makeRequest from "../utils/makeRequest"
import getCryptoId from "../utils/getCryptoId"
// import getCoinLogo from "../utils/getCoinLogo"
import ValueInfo from "./valueInfo"
import calcStyles from "../styles/Calculator.module.css"

function Calculator({ coin }) {
    const coinOptions = [
        "bitcoin",
        "ethereum",
        "dogecoin",
        "shiba-inu",
        "litecoin",
    ]
    const coinLogos = []

    const [coinOptionIds, setCoinOptionIds] = useState([])

    let requestUrl = 
    `https://api.coingecko.com/api/v3/simple/price?ids=` + 
    `${coinOptions.join()}` +
    `&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`
    
    const [radio, setRadio] = useState(coinOptions[0])
    const [userInvestment, setUserInvestment] = useState(0) // in USD
    const [userInvestmentCoinCurrency, setUserInvestmentCoinCurrency] = useState(0)
    const [initialCoinPrice, setinitialCoinPrice] = useState(0) // in USD
    const [sellingCoinPrice, setSellingCoinPrice] = useState(0) // in USD
    // const [investmentFee, setInvestmentFee] = useState(0)
    // const [withdrawFee, setwithdrawFee] = useState(0)
    const [gainOrLoss, setGainOrLoss] = useState(0)
    const [totalReturn, setTotalReturn] = useState(0)
    
    let exchangeRate = 1/initialCoinPrice

    useEffect(() => {
        // call once to set value for initial coin price at the beginning
        makeRequest(requestUrl).then(value => {setinitialCoinPrice(value[radio]["usd"])})
        // btc/usd conversion
        
        setUserInvestmentCoinCurrency(userInvestment * exchangeRate)

        // get crypto Ids
        coinOptions.forEach(coinOption => {
            getCryptoId(coinOption)
            .then(value => setCoinOptionIds(
                coinOptions => [...coinOptions, value]
            ))
        })
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
    }, [radio, userInvestment, initialCoinPrice, sellingCoinPrice])
    
    return (
        <div className={calcStyles.calcContainer}>
            <div className={calcStyles.upperDiv}>
                <ValueInfo coin={radio} coinOptions={coinOptions} />
                <div className={calcStyles.inputsContainer}>
                    <label htmlFor="userInvestment">Investment (USD)</label>
                    <input
                        type="number"
                        value={userInvestment}
                        id="userInvestment"
                        onChange={(e) => {setUserInvestment(e.target.value)}}
                    />
                    {userInvestmentCoinCurrency ? 
                        <p className={calcStyles.valueConvertedToCoin}>
                            {userInvestmentCoinCurrency} {radio}(s)
                        </p> : null}
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

                </div>
            </div>
            <div className={calcStyles.coinOptionsContainer}>
                {coinOptions.map(coinOption => (
                    <div className={calcStyles.radioContainer}>
                        <label>
                            <input 
                                type="radio" 
                                checked={radio === coinOption}
                                value={coinOption}
                                onChange={(e) => {setRadio(e.target.value)}}
                            />
                            <span>{coinOption}</span>   
                        </label>
                    </div>
                ))}
            </div>
            <div className={calcStyles.gainsLossesContainer}>
                {/* profit or loss = (sellingCoinPrice - initialCoinPrice)/100 * initial investment */}
                <div>
                    <h2>Gains/losses: </h2>
                    {gainOrLoss &&
                        (<h1 className={calcStyles.gainsLosses}>${gainOrLoss}</h1>)
                    }
                </div>
                <div>
                    <h2>Total: </h2>
                    {totalReturn &&
                        (<p className={calcStyles.totalReturns}>${totalReturn}</p>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Calculator