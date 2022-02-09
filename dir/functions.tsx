import Image from "next/image"
import React from 'react'

const svg = (name: string, size = 35) => <Image
    src={`/assets/svg/${name}.svg`}
    alt=""
    width={size}
    height={size}
/>

export { svg }