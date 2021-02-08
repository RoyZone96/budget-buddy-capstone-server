require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { CLIENT_ORIGIN } = require('./config')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const errorHandler = require('./middleware/error-handler')
const usersRouter = require('./users/users-router')
const budgetsRouter = require('./budgets/budgets-router')
const purchasesRouter = require('./purchases/purchases-router')
const supportsRouter = require('./supports/supports-router')
const authRouter = require('./auth/auth-router')
const path = require('path')


const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption, {
  skip: () => NODE_ENV === 'test',
}))
app.use(cors(
  ({
    origin: CLIENT_ORIGIN
  })
))
app.use(helmet())

app.use(express.static('public'))

app.use('/api/supports', supportsRouter)
app.use('/api/users', usersRouter)
app.use('/api/budgets', budgetsRouter)
app.use('/api/purchases', purchasesRouter)
app.use('/api/auth', authRouter)


app.use(errorHandler)

module.exports = app