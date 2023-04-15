
import React from 'react'
import Image from 'next/image'

export async function getStaticPaths(){
    const { events_categories } = await import('../../../data/data.json')
    const allPaths=events_categories.map((event)=>{
        return {
            params:{
                cat:event.id.toString()
            }
        }
        })

        console.log(allPaths)
    
    return{
        paths:allPaths,
        fallback:false
    }
}


export async function getStaticProps(context){
    const { allEvents } = await import('../../../data/data.json')
    console.log('Context>>>',context)
    const id=context?.params.cat
    console.log(id)

    const data=allEvents.filter((data)=>{
        const city=data.city.toLowerCase()
        return city==id
    })
    console.log('CITY DATA>>',data)
    return{
        props:{
          data:data
        }
    }
}

const EventCat = ({data}) => {
  return (
    <>
       {
    data.map((data)=>{
        return(
            <div>

                <h2>Event in </h2>
                          <Image width={300} height={300} alt={data.title} src={data.image} />
                          <div>
                            <h4>{data.title}</h4>
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