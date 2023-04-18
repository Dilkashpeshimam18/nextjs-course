import path from 'path'
import fs from 'fs'
const buildPath = () => {
    return path.join(process.cwd(), 'src', 'data', 'data.json')
}

const extractData = (filePath) => {
    const jsonData = fs.readFileSync(filePath)
    return JSON.parse(jsonData)
}
export default async function handler(req, res) {
    const { method } = req

    const filePath = await buildPath()
    const { allEvents, events_categories } = await extractData(filePath)

    if (!allEvents && events_categories) {
        return res.status(404).json('Events Data not found!')
    }
    try {
        if (method === 'POST') {
            const { email, eventId } = req.body

            const updatedAllEvents = allEvents.map((eve) => {
                if (eve.id === eventId) {
                    if (eve.emails_registered.includes(email)) {
                        return res.status(201).json({ message: 'Email already registered!' })
                    }
                    return {
                        ...eve,
                        emails_registered: [...eve.emails_registered, email]
                    }


                }

                return eve;
            })
            await fs.writeFileSync(filePath, JSON.stringify({ events_categories, allEvents: updatedAllEvents }))
            res.status(200).json({ message: 'Registration successful' })
        }
    } catch (err) {
        res.status(500).json({ err: 'Something went wrong!' })
    }

}