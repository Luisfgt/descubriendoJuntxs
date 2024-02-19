import server from './src/app'

const PORT = 3000

server.listen(PORT, () =>{
    console.log (`Server running on port ${PORT}`)
})