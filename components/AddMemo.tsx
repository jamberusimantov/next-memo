import styles from '../styles/AddMemo.module.css'
import React, { FormEvent, useState } from 'react'
import { svg, btn } from '../dir/functions';
import { memo } from '../dir/types';

const AddMemo = () => {
    const [memo, setMemo] = useState<memo>({ title: '', message: '', tags: '', date: '' })

    const inputWithEraser = (key: string) => {
        switch (key) {
            case 'title': return <div className={styles.input_container}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder='Title'
                    required
                    value={memo.title}
                    maxLength={50}
                    onChange={(e) => setMemo({ ...memo, title: e.currentTarget.value })}
                />
                {memo.title && btn(svg('blue-erase', 20), () => setMemo({ ...memo, title: '' }), styles.erase)}
            </div>
            case 'message': return <div className={styles.input_container}>
                <textarea
                    className={styles.input}
                    placeholder={'Message'}
                    value={memo.message}
                    required
                    maxLength={500}
                    onChange={(e) => setMemo({ ...memo, message: e.currentTarget.value })}
                    rows={10}
                    cols={30} />
                {memo.message && btn(svg('blue-erase', 20), () => setMemo({ ...memo, message: '' }), styles.erase)}
            </div>
            case 'tags': return <div className={styles.input_container}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder='Tags'
                    required
                    value={memo.tags}
                    maxLength={50}
                    onChange={(e) => setMemo({ ...memo, tags: e.currentTarget.value })}
                />
                {memo.tags && btn(svg('blue-erase', 20), () => setMemo({ ...memo, tags: '' }), styles.erase)}
            </div>
            default: { }
        }
    }
    const submit = (e: FormEvent) => {
        e.preventDefault();
        console.log(memo)
    }

    return (
        <div className={styles.container}>
            <form onSubmit={submit}>
                {inputWithEraser('title')}
                {inputWithEraser('message')}
                {inputWithEraser('tags')}
                {btn(svg('blue-send'), undefined, styles.submitBtn, true)}
            </form>
        </div>
    )
}

export default AddMemo;