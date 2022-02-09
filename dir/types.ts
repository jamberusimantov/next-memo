import { ReactElement, ReactNode } from 'react'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'


type AppPropsWithLayout = AppProps & {
    Component: NextPage & {
        getLayout: (page: ReactElement) => ReactNode
    }
}
type file ={ 
    name: string, 
    size: string, 
    type: string 
    base64: string | null | ArrayBuffer, 
}

export type {
    AppPropsWithLayout,
    file,
    
}