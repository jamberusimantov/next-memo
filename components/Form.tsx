import React, { ChangeEvent, FormEvent, useState, useRef } from 'react'
import styles from '../styles/Form.module.css';
import { svg } from '../dir/functions';
import { file } from '../dir/types';

const Form = () => {
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
    const [tags, setTags] = useState('')
    const [image, setImage] = useState<file>({ name: '', size: '', type: '', base64: '' })

    const uploadInputEl: any = useRef(null);

    const inputWithEraser = (
        state: string,
        setState: (e: any) => void,
        placeholder: string,
        textArea = false) => {
        return (<div>
            {textArea ?
                <textarea
                    className={styles.input}
                    placeholder={placeholder}
                    value={state}
                    required
                    maxLength={500}
                    onChange={(e) => setState(e.currentTarget.value)}
                    rows={10}
                    cols={30} />
                :
                <input
                    className={styles.input}
                    type="text"
                    placeholder={placeholder}
                    required
                    value={state}
                    maxLength={50}
                    onChange={(e) => setState(e.currentTarget.value)}
                />
            }
            {state &&
                <button
                    className={styles.erase}
                    type="button"
                    children={svg('blue-erase', 20)}
                    onClick={() => { setState('') }}
                />
            }
        </div>)


    }
    const fileClick = () => {
        uploadInputEl.current?.click();
    }
    const fileChange = (e: any) => {
        if (!e.target.files.length) return;
        const { name, type, size } = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImage({
                name,
                type,
                size: `${~~(size / 1000)} kB`,
                base64: reader.result
            })
        }
        reader.readAsDataURL(e.target.files[0]);
    }
    const submit = (e: FormEvent) => {
        e.preventDefault();
        console.log({ title, message, tags, image })
    }

    return (
        <div className={styles.container}>
            <form onSubmit={submit}>
                {inputWithEraser(title, setTitle, 'Memo title')}
                {inputWithEraser(message, setMessage, 'Memo message', true)}
                {inputWithEraser(tags, setTags, 'Memo tags')}
                <div
                    onClick={fileClick}
                >
                    <span>{image?.name}</span>
                    <button
                        className={styles.addBtn}
                        type="button"
                        children={svg('blue-add')}
                    />
                    <input
                        className={styles.uploadInput}
                        onChange={fileChange}
                        ref={uploadInputEl}
                        id='uploadFileInput'
                        type='file'
                    />
                </div>
                <button
                    type="submit"
                    className={styles.submitBtn}
                    children={svg('blue-send')}
                />
            </form>
        </div>
    )
}

export default Form;
