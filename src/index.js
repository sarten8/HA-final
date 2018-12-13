import express from 'express'
import mongoose from 'mongoose'
import routes from './routes/index'
import cors from 'cors'

const uri = 'mongodb://admin:admin123@ds245615.mlab.com:45615/hackacademy'
const options = { useNewUrlParser: true, reconnectTries: 10, reconnectInterval: 500, }

const app = express()

app.options('*', cors())
app.use(cors())

const server = () => {
    app.listen(3000, console.log('Server en port 3000'))
}

// Rutas
routes(app)

mongoose.connect(uri, options).then(
    con => { 
        console.log(`Conexion a base en puerto ${ con.connections[0].port }`) 
        server()
    },
    err => { console.log(`Error al conectar con base de datos: ${ err }`) }
)
