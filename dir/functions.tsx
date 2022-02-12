import React from 'react'
import Image from "next/image"
import styles from '../styles/Home.module.css'
import { objectWithStringKey, keysForComposeURL } from './types'

const svg = (name: string, size = 35) => <Image
    src={`/assets/svg/${name}.svg`}
    alt=""
    width={size}
    height={size}
/>

const btn = (child: any, onClick = () => { }, className = styles.btn, submit = false) => <button
    children={child}
    onClick={onClick}
    className={className}
    type={submit ? 'submit' : 'button'}
/>

const Btn = (props: {
    child: JSX.Element,
    onClick?: (event: React.MouseEvent<HTMLElement>) => void,
    className?: string,
    submit?: boolean,
    reset?: boolean,
}) => {
    return <button
        children={props.child}
        onClick={props.onClick}
        className={props.className || styles.btn}
        type={props.submit ? 'submit' : props.reset ? 'reset' : 'button'}
    />
}

const Input = React.forwardRef((props: {
    name: string
    className: string,
},
    ref: any) => {
    switch (props.name) {
        case 'title': return <div className={styles.input_container}>
            <input
                className={props.className}
                type="text"
                placeholder='Title'
                ref={ref}
                required
                maxLength={50}
            />
            <Btn child={svg('blue-erase')} reset={true} />
        </div>
        case 'message': return <textarea
            className={props.className}
            placeholder={'Message'}
            ref={ref}
            required
            maxLength={500}
            rows={10}
            cols={30}
        />
        case 'tags': return <input
            className={props.className}
            type="text"
            placeholder='Tags'
            ref={ref}
            required
            maxLength={50}
        />
        default: return <input
            className={props.className}
            type="text"
            ref={ref}
            placeholder='Search'
        />
    }
})

const composeURL = (object: objectWithStringKey) => {
    let base = '/api/memoAPI';

    if (object && Object.keys(object).length > 0) {
        Object.keys(object).forEach((key, i) => {

            if (i === 0) {
                base += `?${key}=${encodeURI(object[key])}`
            } else {
                base += `&${key}=${encodeURI(object[key])}`
            }
        });
    }
    return base;
}

const fetcher = (url: string, method?: string) => fetch(url, { method: method || 'GET' }).then((res) => res.json());

export { svg, btn, fetcher, composeURL, Btn, Input }