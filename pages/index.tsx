import React, { ReactElement, useState } from 'react';
import styles from '../styles/Home.module.css'
import { Layout, AddMemo, DisplayMany, SearchMemo } from '../components';
import { svg, btn } from '../dir/functions';
import { memo } from '../dir/types';

const Home = (props: { memos: memo[] }) => {
  const [state, setState] = useState('layout')
  const memos: memo[] = (!props.memos || !props.memos.length) ? [{
    title: 'NEW YEAR RESOLUTION',
    message: 'eat healthy, do yoga and have fun',
    tags: 'hopes, dreams, success',
    date: '31.12.2021 23:59:59'
  }] : props.memos;


  return (
    <div className={styles.container}>
      <div className={styles.toolbox}>
        {btn(svg('blue-search'), () => setState('search'))}
        {btn(svg('blue-layout'), () => setState('layout'))}
        {btn(svg('blue-erase'), () => setState('erase'))}
        {btn(svg('blue-write'), () => setState('write'))}
        {state === 'search' &&
          <SearchMemo memos={memos} />
        }
      </div>
      <div className={styles.mainArea}>
        {state !== 'write' ?
          <DisplayMany memos={memos} state={state} />
          :
          <AddMemo />
        }
      </div>
    </div>
  )
}

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default Home
