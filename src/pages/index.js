import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import HomePage from '@/components/HomePage/HomePage'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
const inter = Inter({ subsets: ['latin'] })

//getServerSideProps- runs only on server & before the component get  executed.
export async function getServerSideProps() {
  const { events_categories } = await import('../data/data.json')
  return {
    props: {
      data: events_categories
    }
  }
}

export default function Home({ data }) {
  return (
    <>

     <Header />
     <HomePage data={data} />
     <Footer />
     
    </>
  )
}

