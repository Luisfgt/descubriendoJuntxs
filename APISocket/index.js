import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import express from 'express'
import http from 'http'
import {Server as SocketServer} from 'socket.io'
import { postCommentary } from './src/controllers/commentary.js'
const server = express()
const PORT = process.env.PORT || 3003

const serverSocket = http.createServer(server)
const io = new SocketServer(serverSocket)

io.on('connection', socket => {
    console.log('Cliente conectado');
    socket.on('commentary', async (data) => {
        console.log(data);
        const postComment = await postCommentary(data)
        if (postComment.error) {
            io.emit('commentaryError',
                {
                    error: postComment.message
                }
            )
        } else {
            io.emit('newCommentary', postComment.newCommentary)
        }
    })
})

server.use(cors())
server.use(express.json())

serverSocket.listen(PORT, () => {
    console.log(`el servidor se ha montado en el puerto ${PORT}`);
})
