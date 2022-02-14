import React, { ReactElement, useState } from 'react';
import styles from '../styles/Home.module.css'
import dbConnection from '../dir/mongoDB/connection';
import Memos from '../dir/mongoDB/Memos';
import { svg, Btn } from '../dir/elements';
import { fetcher } from '../dir/functions';
import { memo } from '../dir/types';
import { Layout, AddMemo, DisplayMany, SearchMemo, Register } from '../components';
import useSWR from "swr";
import Cookies from 'js-cookie';

const getServerSideProps = async () => {
  await dbConnection();
  const docs = await Memos.find({ creator: 'HARDCODED' });
  return ({
    props: {
      fallback: { memos: JSON.stringify(docs) }
    }
  })
}
const MemoBoard = (props: { memos: memo[] }) => {
  const [state, setState] = useState('layout')
  const [user, setUser] = useState(Cookies.get('memo-simantov.herokuapp.com'))
  const [results, setResults] = useState<{ q: string, arr: memo[] }>({ q: '', arr: [] })
  const { data, error } = useSWR(user ? `/api/memoAPI?creator=${user}` : null, fetcher);
  const searchElRef = React.createRef<HTMLInputElement>()
  if (error || (data && data.error)) {
    console.log(data?.error || "An error has occurred.")
  }
  const memos = (user && data?.data.length) ? data.data : props.memos;


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
        {state !== 'write' ?
          <DisplayMany memos={memos} state={state} results={results} creator={user} />
          :
          user ?
            <AddMemo creator={user} setState={() => setState('layout')} />
            : <Register setState={(user: string) => { setUser(user); setState('layout'); }} />
        }
      </div>
    </div>
  )
}

const Home = (props: { fallback: { memos: string } }) => {
  const memos: memo[] = JSON.parse(props.fallback.memos)

  return (
    <MemoBoard memos={memos} />
  )
}

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>
export { getServerSideProps }
export default Home
