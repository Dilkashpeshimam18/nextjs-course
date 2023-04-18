import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import axios from 'axios'

export async function getStaticPaths() {
  const { allEvents } = await import('../../../data/data.json')
  const allPaths = allEvents.map((eve) => {
    return {
      params: {
        cat: eve?.city.toLowerCase(),
        id: eve?.id.toString()
      }
    }
  })


  return {
    paths: allPaths,
    fallback: false

  }

}

export async function getStaticProps(context) {
  const { allEvents } = await import('../../../data/data.json')
  const id = context?.params.id

  const data = allEvents.filter((data) => {
    return data?.id == id
  })


  return {
    props: {
      data: data
    }
  }

}

const SingleEvents = ({ data }) => {
  const [email, setEmail] = useState('')
  const router = useRouter()
  console.log(router)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const eventId = router?.query.id
      const data = {
        email,
        eventId
      }
      console.log(data)

      let response = await axios.post('/api/email-registration', data, {
        headers: {
          'Content-Type': 'application/json',

        }
      })
      if(!response.ok){
        throw new Error(`Error:${response.status}`)
      }
      console.log(response)
      if(response.status==200 || response.status==201){
        alert(response.data.data.message)
      }
    } catch (err) {
      console.log(err)
    }


  }
  return (
    <div>
      <Image width={300} height={300} alt={data[0].title} src={data[0].image} />

      <h1>{data[0].title}</h1>
      <div>
        <span>City: {data[0].city.toUpperCase()}</span>
        <p>
          {data[0].description}
        </p>
        <form onSubmit={handleSubmit}>
          <label>Get registered for this event</label><br />
          <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' id='email' placeholder='Enter email' />
          <button type='submit'>Submit</button>
        </form>

      </div>

    </div>
  )
}

export default SingleEvents