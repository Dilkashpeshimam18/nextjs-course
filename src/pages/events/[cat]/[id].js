import React from 'react'
import Image from 'next/image'

export async function getStaticPaths() {
  const { allEvents } = await import('../../../data/data.json')
  const allPaths = allEvents.map((eve) => {
    return {
      params: {
        cat: eve.city.toLowerCase(),
        id: eve.id.toString()
      }
    }
  })


  return {
    paths: allPaths,
    fallback: true

  }

}

export async function getStaticProps(context) {
  const { allEvents } = await import('../../../data/data.json')
  console.log('Single Event Context>>>', context)
  const id = context?.params.id

  const data = allEvents.filter((data) => {
    return data.id == id
  })


  return {
    props: {
      data: data
    }
  }

}

const SingleEvents = ({ data }) => {
  return (
    <div>
      <Image width={300} height={300} alt={data[0].title} src={data[0].image} />

      <h1>{data[0].title}</h1>
      <div>
        <span>City: {data[0].city.toUpperCase()}</span>
        <p>
          {data[0].description}
        </p>
      </div>

    </div>
  )
}

export default SingleEvents