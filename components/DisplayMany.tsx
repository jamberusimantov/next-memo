import styles from '../styles/DisplayMany.module.css'
import { memo } from '../dir/types'
import { svg, Btn, fetcher, composeURL } from '../dir/functions'
import React from 'react'
import { useSWRConfig } from "swr";


const Memo = (props: { memo: memo, erase: boolean, deleteHandler: () => Promise<void> }) => {
    return (
        <div className={styles.memo_container}>
            <div className={`${styles.memo_section}${' '}${styles.memo_title}`}>
                {props.memo.title}
            </div>
            <div className={styles.memo_section}>
                {props.memo.message}
            </div>
            <div className={`${styles.memo_section}${' '}${styles.memo_tags}`}>
                {props.memo.tags}
            </div>
            {props.memo.createdAt &&
                <div className={styles.memo_section}>
                    {props.memo.createdAt}
                </div>
            }
            <div className={styles.side_border}></div>
            <div className={styles.memo_delete}>
                {props.erase && <Btn child={svg('delete')} onClick={props.deleteHandler} />}
            </div>
        </div>)
}

const DisplayMany = (props: { memos: memo[], state: string, results: { q: string, arr: memo[] } }) => {
    const { mutate } = useSWRConfig()
    const arr = props.results.q ? props.results.arr : props.memos;

    const deleteMemo = async (props: { id: string | undefined }) => {
        if (!props.id) return;
        const url = composeURL({
            id: props.id
        })
        try {
            const res = await fetcher(url, 'DELETE');
            if (!res.success) throw res.error
            console.log(res.data);
            mutate(composeURL({}));
        } catch (err) { console.log(err); }
    }

    return (
        <div className={styles.memoBoard}>
            {React.Children.toArray(arr?.map((memo, i) => {
                return (
                    <Memo
                        memo={memo}
                        key={i}
                        erase={props.state === 'erase'}
                        deleteHandler={() => deleteMemo({ id: memo._id })}
                    />
                )
            }
            ))}
        </div>
    )
}

export default DisplayMany;