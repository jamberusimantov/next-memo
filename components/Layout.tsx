import Head from 'next/head'
import React, { ReactElement } from 'react'
import styles from '../styles/Layout.module.css'
import { Footer, Header } from '.'

const Layout = (props: { children: ReactElement }) => {

    return (
        <div className={styles.container}>
            <Head>
                <title>Memo</title>
                <meta name="application-name" content='Memo app'/>
                <meta name="description" content='just another Memo app' />
                <meta name="author" content="siman tov jamberu" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <Header />
                <div className={styles.inner_container}>
                    {props.children}
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Layout