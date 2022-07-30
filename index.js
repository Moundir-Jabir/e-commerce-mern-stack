const express = require('express')
const app = express()
require('dotenv').config()

//Routers
const userRouter = require('./routes/users')

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true
}).then(() => console.log('database connected'))
  .catch((e) => console.log('not connect to database', e))

app.use('/api/users', userRouter)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`app running on port ${port}`)
})