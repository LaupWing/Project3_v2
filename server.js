const express      = require('express')
const app          = express()
const bodyParser   = require('body-parser')
const port         = 5000
const router       = require('./routes/router')
const server       = app.listen(port,()=>console.log(`Server is listening to port ${port}`))  
const io           = require('socket.io')(server)
const profileArray = []

app
    .set('views', 'view')
    .set('view engine', 'ejs')
    .use(express.static('static'))
    .use(bodyParser.urlencoded({extended:true}))
    .use(bodyParser.json())
    .use('/', router)

function newProfile(profileObj, id){
    const profile = profileObj
    profile.id = id
    profileArray.push(profile)
    console.log(profileArray)
}

io.on('connection', (socket)=>{
    console.log(`Socket connected with id ${socket.id}`)
    socket.on('profile', (profileObj)=>newProfile(profileObj, socket.id))
    socket.on('get profiles', ()=>socket.emit('send profiles', profileArray))
})