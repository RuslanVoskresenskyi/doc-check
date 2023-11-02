const express = require('express')
const cors = require('cors')
const routes = require('./routes/index')
require('./config/db')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', express.static('./client/build'))

routes(app)

const port = 3050
app.listen(port, () => {console.log('app start')})

exports.app = app

