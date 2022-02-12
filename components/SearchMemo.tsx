import styles from '../styles/SearchMemo.module.css'
import { memo } from '../dir/types';
import React from 'react';

const SearchMemo = React.forwardRef((props: {
    memos: memo[],
    setResults: (results: { q: string, arr: memo[] }) => void
},
    ref: any) => {

    const search = (query: string) => {
        const results: memo[] = []
        if (query) {
            props.memos.forEach(memo => {
                const q = query.toLowerCase();
                if (memo.title.toLowerCase().indexOf(q) > -1 ||
                    memo.message.toLowerCase().indexOf(q) > -1 ||
                    memo.tags.toLowerCase().indexOf(q) > -1) {
                    results.push(memo)
                }
            })

        }
        props.setResults({ q: query, arr: results });
    }

    return (
        <div className={styles.container}>
            <input
                ref={ref}
                type="text"
                placeholder='Search'
                maxLength={50}
                onChange={(e: any) => search(ref.current?.value)}
            />
        </div>
    )
})
SearchMemo.displayName = 'SearchMemo';
export default SearchMemo;