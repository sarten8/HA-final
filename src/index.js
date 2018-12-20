import express from 'express'
import mongoose from 'mongoose'
import routes from './routes/index'
import cors from 'cors'

const uri = 'mongodb://admin:admin123@ds245615.mlab.com:45615/hackacademy'
const options = {
  useNewUrlParser: true,
  reconnectTries: 10,
  reconnectInterval: 500
}

const app = express()

app.use(cors())

const server = () => {
  // eslint-disable-next-line no-console
  app.listen(3000, console.log('Server en port 3000'))
}

// Rutas
routes(app)

mongoose
  .connect(
    uri,
    options
  )
  .then(
    con => {
      // eslint-disable-next-line no-console
      console.log(`Conexion a base en puerto ${con.connections[0].port}`)
      server()
    },
    err => {
      // eslint-disable-next-line no-console
      console.log(`Error al conectar con base de datos: ${err}`)
    }
  )
