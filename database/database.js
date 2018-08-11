import mongoose from 'mongoose'

export default uri => {
  // Setup MongoDB connection
  mongoose.connect(
    uri,
    { useNewUrlParser: true },
  )
  const db = mongoose.connection
  db.on(`error`, console.error.bind(console, 'MongoDB connection error:'))
  db.once(`open`, () => {
    console.log('Connected to MongoDB')
  })
  return db
}
