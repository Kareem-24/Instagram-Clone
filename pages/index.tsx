import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import Feed from '../components/Feed/Feed'
import Modal from '../components/Modal'
const Home: NextPage = () => {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Instagram Clone</title>
        <link rel="icon" href="https://assets.stickpng.com/images/580b57fcd9996e24bc43c521.png" />
      </Head>

      <Header/>
      <Feed/>
      <Modal/>
    </div>
  )
}

export default Home
