import Head from 'next/head'
import Nav from './nav'
import Footer from './footer'
import styles from '../styles/Home.module.css'

export default function Layout({ children, pageName }) {
    return ( 
        <div className={styles.container}>            
            <Head>
                <title>{pageName} | Crypto Calc</title>
                <meta name="description" content="Cryptocurrency profit/loss calculator with data from CoinMarketCap API" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Nav />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    
    )
}