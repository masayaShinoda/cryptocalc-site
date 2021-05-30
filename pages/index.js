import Layout from "../components/layout"
import Calculator from "../components/calculator"

export default function Home() {
  // const CoinSelector = 
  //   <div style={{width: `90vw`, display: `inline-flex`, justifyContent: `center`}}>
  //     <h1>
  //       Crypto profit/loss calculator (USD)
  //     </h1>
  //   </div>

  return (
    <Layout pageName="Calculator">
      {/* {CoinSelector} */}

        <Calculator />
    </Layout>
  )
}
