import styles from '../styles/AddMemo.module.css'
import React, { FormEvent } from 'react'
import { svg, Btn, Input } from '../dir/elements';
import { fetcher, composeURL } from '../dir/functions';
import { useSWRConfig } from "swr";


const AddMemo = (props: { creator: string, setState: () => void }) => {
    const titleELRef = React.createRef<HTMLInputElement>()
    const messageELRef = React.createRef<HTMLInputElement>()
    const tagsELRef = React.createRef<HTMLInputElement>()
    const { mutate } = useSWRConfig()

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const url = composeURL('/api/memoAPI', {
                creator: props.creator,
                tags: `${tagsELRef.current?.value}`,
                message: `${messageELRef.current?.value}`,
                title: `${titleELRef.current?.value}`
            });
            const res = await fetcher(url, 'POST');
            if (!res.success) throw res.error
            mutate(`/api/memoAPI?creator=${props.creator}`)
            props.setState();
        } catch (err) { console.log(err); }
    }

    return (
        <div className={styles.container}>
            <form onSubmit={submit}>
                <Input name={'title'} ref={titleELRef} className={styles.input} />
                <Input name={'message'} ref={messageELRef} className={styles.input} />
                <Input name={'tags'} ref={tagsELRef} className={styles.input} />
                <Btn child={svg('blue-send')} className={styles.submitBtn} submit={true} />
            </form>
        </div>
    )
}

export default AddMemo;