import '../styles/globals.css'
import 'tailwindcss/tailwind.css'

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import Layout1 from '../components/Layout1'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <SessionProvider session={pageProps.session}>
      {
        getLayout(<Component {...pageProps} />)
      }
    </SessionProvider>
  )
}

export default MyApp
