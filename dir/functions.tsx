import Image from "next/image"
import React from 'react'
import styles from '../styles/Home.module.css'


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

export { svg, btn }