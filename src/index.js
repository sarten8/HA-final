import express from 'express'
import mongoose from 'mongoose'
import routes from './routes/index'
import cors from 'cors'

const uri = 'mongodb://localhost:27017/hackacademy_final'
const options = { useNewUrlParser: true, reconnectTries: 10, reconnectInterval: 500, }

const app = express()

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
