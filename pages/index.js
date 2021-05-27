import Layout from "../components/layout"
import Calculator from "../components/calculator"

export default function Home() {
  const CoinSelector = 
    <div style={{width: `90vw`, display: `inline-flex`, justifyContent: `center`}}>
      <h1>
        Crypto profit/loss calculator (USD)
      </h1>
    </div>

  return (
    <Layout pageName="Calculator">
      {CoinSelector}
      <div style={{
        display: `flex`,
        flexWrap: `wrap`, 
        justifyContent: `space-evenly`, 
        width: `90vw`,
        padding: `4.25vh 0`
      }}>
        <Calculator />
      </div>
    </Layout>
  )
}
