const mongoose = require('mongoose')

module.exports = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    console.log(`MongoDB connected on: ${conn.connection.host}`)
  } catch (err) {
    console.error(`Error: ${err.message}`)
    process.exit(1)
  }
}
