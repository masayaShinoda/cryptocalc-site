import Link from 'next/link'
import styles from "../styles/nav.module.css"

export default function Nav() {
    return (
        <div className={styles.navContainer}>
            <Link href="/">
                <img src="/crypto-calc-04.png" className={styles.logo} />
            </Link>
            <nav>
                <Link href="https://github.com/masayaShinoda/cryptocalc-site">GitHub</Link>
            </nav>
        </div>
    )
}