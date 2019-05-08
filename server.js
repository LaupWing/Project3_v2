const express    = require('express')
const app        = express()
const bodyParser = require('body-parser')
const port       = 5000
const router     = require('./routes/router')
const server     = app.listen(port,()=>console.log(`Server is listening to port ${port}`))
const io         = require('socket.io')(server)


app
    .set('views', 'view')
    .set('view engine', 'ejs')
    .use(express.static('static'))
    .use(bodyParser.urlencoded({extended:true}))
    .use(bodyParser.json())
    .use('/', router)


io.on('connection', (socket)=>{
    console.log(`Socket connected with id ${socket.id}`)
})