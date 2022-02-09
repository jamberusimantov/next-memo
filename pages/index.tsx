import React, { ReactElement } from 'react';
import styles from '../styles/Home.module.css'
import { Layout, Form } from '../components';
import { svg } from '../dir/functions';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.toolbox}>
        <span>{svg('blue-click')}</span>
        <span>{svg('blue-search')}</span>
        <span>{svg('blue-share')}</span>
        <span>{svg('blue-write')}</span>
      </div>
      <div className={styles.mainArea}>
        <Form />

      </div>
    </div>
  )
}

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default Home
