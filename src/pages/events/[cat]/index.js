
import React from 'react'
import Image from 'next/image'

export async function getStaticPaths() {
    const { events_categories } = await import('../../../data/data.json')
    const allPaths = events_categories.map((event) => {
        return {
            params: {
                cat: event.id.toString()
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
    const id = context?.params.cat

    const data = allEvents.filter((data) => {
        const city = data.city.toLowerCase()
        return city == id
    })
    return {
        props: {
            data: data
        }
    }
}

const EventCat = ({ data }) => {
    return (
        <>
            {
                data.map((data) => {
                    return (
                        <div>
                         <a key={data.id} href={`/events/${data.city}/${data.id}`} >
                         <Image width={300} height={300} alt={data.title} src={data.image} />
                         <h4>{data.title}</h4>

                          </a>
                         <div>
                                <span>City: {data.city.toUpperCase()}</span>
                                <p>
                                    {data.description}
                                </p>
                            </div>
                           

                        </div>
                    )


                })
            }
        </>

    )
}

export default EventCat