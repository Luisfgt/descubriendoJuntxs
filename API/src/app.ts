import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import compression from 'compression'


import routes from './routes'
// import { postCommentary } from './controllers/commentary'
import uploadRoutes from './routes/upload' // Asegúrate de que este es el archivo correcto

const server = express()

// Envío con protocolo Socket: 



// middlewares prade
server.use(cors()) // middleware que permite que el servidor reciba peticiones de otros servidores
server.use(helmet()) // middleware que añade seguridad a las peticiones
server.use(compression()) // middleware que comprime las peticiones

// routes
server.use("/upload", uploadRoutes); // Asegúrate de que esta es la ruta correcta
server.use(bodyParser.json()) // middleware que transforma los req.body a un objeto de javascript
server.use(morgan('dev')) // middleware que muestra por consola las peticiones que se hacen al servidor (GET, POST, PUT, DELETE

server.use("/", routes);


export default server