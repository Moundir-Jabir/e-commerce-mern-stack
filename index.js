const express = require('express')
const app = express()
const expressValidator = require('express-validator')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()

//Routers
const authRouter = require('./routes/auth')
const userRouter = require('./routes/users')
const categoryRouter = require('./routes/categories')
const productRouter = require('./routes/products')

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true
}).then(() => console.log('database connected'))
  .catch((e) => console.log('not connect to database', e))

app.use(express.json())
app.use(expressValidator())
app.use(cookieParser())
app.use(cors())

app.use('/api', authRouter)
app.use('/api/users', userRouter)
app.use('/api/category', categoryRouter)
app.use('/api/products', productRouter)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`app running on port ${port}`)
})