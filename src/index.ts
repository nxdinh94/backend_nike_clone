import express, { Request, Response, NextFunction } from 'express'
import usersRoute from './routes/users.routes'
import { defaultErrorHandler } from './middlewares/errors.middlewars'
import { dataSource } from '~/dataSource'
const app = express()
const port = 3222
app.use(express.json())

dataSource
  .initialize()
  .then(() => {
    console.log('Database connect successfully')
  })
  .catch((error) => {
    console.log(error)
  })

app.use('/users', usersRoute)

app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
