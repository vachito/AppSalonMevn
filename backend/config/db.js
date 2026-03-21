import mongoose from 'mongoose'

export const db = async () => {
    try {
        const db = await mongoose.connect('mongodb+srv://vacho19_db_user:8q1HAGRB9PP9LaIf@cluster0.eo4tsn5.mongodb.net/?appName=Cluster0')
        console.log('Se conecto correctamente')
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}