import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

const Home: NextPage = () => {


  return (
    <div>
      <Head>
        <title>Green Pure</title>
        <meta name="description" content="Monitoriza la calidad del aire en tu empresa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <nav>GreenPure</nav>
      </main>
    </div>
  )
}

export default Home
