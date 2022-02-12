import React, { ReactElement, useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import dbConnection from '../dir/mongoDB/connection';
import Memos from '../dir/mongoDB/Memos';
import { svg, Btn, fetcher, composeURL } from '../dir/functions';
import { memo } from '../dir/types';
import { Layout, AddMemo, DisplayMany, SearchMemo } from '../components';
import useSWR, { SWRConfig } from "swr";

const getServerSideProps = async () => {
  await dbConnection();
  const docs = await Memos.find();
  return ({
    props: {
      fallback: { memos: JSON.stringify(docs) }
    }
  })
}
const MemoBoard = () => {
  const [state, setState] = useState('layout')
  const [results, setResults] = useState<{ q: string, arr: memo[] }>({ q: '', arr: [] })
  const { data, error } = useSWR(composeURL({}), fetcher);
  const searchElRef = React.createRef<HTMLInputElement>()
  const creator = 'HARDCODED'


  if (error || (data && !data.success)) {
    console.log(data?.error || "An error has occurred.")
  }
  //some spinner maybe
  if (!data) return <h1>Loading...</h1>
  const memos = data.data;

  return (
    <div className={styles.container}>
      <div className={styles.toolbox}>
        <Btn child={svg('blue-search')} onClick={() => setState('search')} />
        <Btn child={svg('blue-layout')} onClick={() => setState('layout')} />
        <Btn child={svg('blue-erase')} onClick={() => setState('erase')} />
        <Btn child={svg('blue-write')} onClick={() => setState('write')} />
        {state === 'search' &&
          <SearchMemo memos={memos} setResults={setResults} ref={searchElRef} />
        }
      </div>
      <div className={styles.mainArea}>
        {state === 'write' ?
          <AddMemo creator={creator} setState={() => setState('layout')} />
          :
          <DisplayMany memos={memos} state={state} results={results} />
        }
      </div>
    </div>
  )
}
const Home = (props: { fallback: { memos: string } }) => {

  useEffect(() => {
    const time = new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 365)).toUTCString();
    const cookie = 'memo-simantov.herokuapp.com';
    const setCookie = (cookie: string, date: string) => {
      if (!document.cookie
        .split('; ')
        .find(row => row.startsWith(cookie))) {
        document.cookie = `${cookie}=true; expires=${date}; Secure`;
      }
    }
    setCookie(cookie, time)

    console.log(document.cookie
      .split('; ')
      .find(row => row.startsWith(cookie)));
      
  }, [])
  return (
    <SWRConfig value={{
      fallback: {
        memos: JSON.parse(props.fallback.memos)
      },
      // refreshInterval: 10000,
    }}>
      <MemoBoard />
    </SWRConfig >
  )
}

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>
export { getServerSideProps }
export default Home
