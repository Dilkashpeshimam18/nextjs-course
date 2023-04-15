import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const HomePage = ({ data }) => {
    return (
        <main >
            <h1>All Events</h1>
            {data.map((data) => {
                return (
                    <>
                        <Link key={data.id} href={`/events/${data.id}`}>
                            <Image src={data.image} width={300} height={300} />
                            <h2>{data.title}</h2>
                            <p>{data.description}</p>
                        </Link>

                    </>
                )
            })}


        </main>
    )
}

export default HomePage