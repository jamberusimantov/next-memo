import { ReactElement } from 'react';
import styles from '../styles/Home.module.css'
import { Layout } from '../components';

const Home = () => {
  return (
    <div className={styles.container}>

    </div>
  )
}

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default Home
