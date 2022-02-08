import Image from 'next/image'
import styles from '../styles/Layout.module.css'

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.title_container}>
                <Image
                    src="/assets/memo.png"
                    alt=""
                    width={50}
                    height={50}
                />
                <h1 className={styles.title}>
                    Memo
                </h1>
            </div>
        </div>
    )
}
export default Header;