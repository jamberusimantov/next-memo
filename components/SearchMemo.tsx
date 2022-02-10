import styles from '../styles/SearchMemo.module.css'
import { memo } from '../dir/types';


const SearchMemo = (props: { memos: memo[] }) => {
    const search = () => {
        console.log('search a memo');
    }

    return (
        <div className={styles.container}>
            <input
                type="text"
                placeholder='Search'
                maxLength={50}
                onChange={search}
            />
        </div>
    )
}

export default SearchMemo;