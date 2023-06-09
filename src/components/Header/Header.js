import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

const Header = () => {
  return (
    <header>
    <Head>
      <title>Event App</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <nav>
      <img />
      <Link href='/'>Home</Link>
      <Link href='/events'>Events</Link>
      <Link href='/about-us'>About Us</Link>


    </nav>
  </header>
  )
}

export default Header