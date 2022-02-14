import { ReactElement, ReactNode } from 'react'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'

type AppPropsWithLayout = AppProps & {
    Component: NextPage & {
        getLayout: (page: ReactElement) => ReactNode
    }
}
type file = {
    name: string,
    size: string,
    type: string
    base64: string | null | ArrayBuffer,
}
type memo = objectWithStringKey & {
    title: string,
    message: string,
    tags: string,
    creator: string,
    createdAt?: string,
    _id?: string
}
type user = {
    phoneNumber: String,
    _id?: string
}

type response = {
    success: boolean,
    data: any,
    error?: string
}

type objectWithStringKey = {
    [key: string]: string
}

export type {
    AppPropsWithLayout,
    file,
    memo,
    response,
    objectWithStringKey,
    user,

}