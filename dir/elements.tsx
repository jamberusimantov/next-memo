import React from 'react'
import Image from "next/image"
import styles from '../styles/Home.module.css'

const svg = (name: string, size = 35) => <Image
    src={`/assets/svg/${name}.svg`}
    alt=""
    width={size}
    height={size}
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
        case 'title': return <div>
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
        case 'phoneNumber': return <input
            className={props.className}
            type="tel"
            placeholder='1234567'
            ref={ref}
            required
            pattern="[0-9]{7}"
        />
        default: return <input
            className={props.className}
            type="text"
            ref={ref}
            placeholder='Search'
        />
    }
})

export { svg, Btn, Input }