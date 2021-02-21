require('dotenv').config()
const User = require('./user.model')
const bcrypt = require('bcryptjs')
const connectDB = require('./db')

connectDB()

const users = [
  {
    username: 'coffee-the-one',
    password: 'test1234',
  },
]

const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'

const random = (min, range) => {
  return Math.floor(Math.random() * range + min)
}

const randomPwd = () => {
  let pwd = ''
  for (let i = 0; i < 7; i++) {
    pwd += chars[random(0, chars.length)]
  }
  return pwd
}

const seed = async () => {
  try {
    // for (let i = 0; i < 2; i++) {
    //   const pwd = await bcrypt.hash(randomPwd(), 10)

    //   users.push({
    //     username: 'coffee' + i,
    //     password: pwd,
    //   })
    // }
    // await User.insertMany(users)
    await User.create({
      username: 'coffee-the-one',
      password: await bcrypt.hash('test1234', 10),
    })
    console.log('Data inserted successfully')
    process.exit()
  } catch (err) {
    console.error(`Error: ${err.message}`)
    process.exit(1)
  }
}

seed()
