import React from 'react'
import Image from 'next/image'

export async function getStaticProps() {
  const { events_categories } = await import('../../data/data.json')
  console.log(events_categories)
  return {
    props: {
      data: events_categories
    }
  }
}

const Events = ({ data }) => {
  return (
    <div>
      <h1>Events Page</h1>
      <div>
        {data.map((data) => {
          return (
            <a key={data.id} href={`/events/${data.id}`}>
              <Image width={300} height={300} alt={data.title} src={data.image} />
              <h2>{data.title}</h2>
            </a>

          )
        })}

      </div>
    </div>
  )
}

export default Events