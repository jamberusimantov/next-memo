import styles from '../styles/DisplayMany.module.css'
import { memo } from '../dir/types'
import { svg, btn } from '../dir/functions'
import React from 'react'

const DisplayMany = (props: { memos: memo[], state: string }) => {

    const deleteMemo = () => {
        console.log('delete a memo');
    }

    const Memo = (props: { memo: memo, erase: boolean }) => {
        return (
            <div
                className={styles.memo_container}
            >
                <div className={`${styles.memo_section}${' '}${styles.memo_title}`}>
                    {props.memo.title}
                </div>
                <div className={styles.memo_section}>
                    {props.memo.message}
                </div>
                <div className={`${styles.memo_section}${' '}${styles.memo_tags}`}>
                    {props.memo.tags}
                </div>
                <div className={styles.memo_section}>
                    {props.memo.date}
                </div>
                <div className={styles.side_border}></div>
                <div className={styles.memo_delete}>
                    {props.erase && btn(svg('delete'), deleteMemo)}
                </div>
            </div>
        )
    }

    return (
        <div className={styles.memoBoard}>
            {React.Children.toArray(props.memos?.map((memo, i) =>
                <Memo memo={memo} key={i} erase={props.state === 'erase'} />
            ))}
        </div>
    )
}

export default DisplayMany;