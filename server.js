const express      = require('express')
const app          = express()
const bodyParser   = require('body-parser')
const port         = 5000
const router       = require('./routes/router')
const server       = app.listen(port,()=>console.log(`Server is listening to port ${port}`))  
const io           = require('socket.io')(server)
const profileArray = []
const session      = require('express-session')

app
    .set('views', 'view')
    .set('view engine', 'ejs')
    .set('profiles', profileArray)
    .use(express.static('static'))
    .use(session({
        secret: "VoldoendePlz!",
		cookie: {secure: false}, //set to true op production, vergt https
		resave: false,
		saveUninitialized: true
    }))
    .use(bodyParser.urlencoded({extended:true}))
    .use(bodyParser.json())
    .use('/', router)

function newProfile(profileObj, id){
    const profile = profileObj
    profile.id = id
    profileArray.push(profile)
}

function sendMsgToUser(obj){
    io.to(obj.id)
        .emit('sending msg', obj.msg)
}

io.on('connection', (socket)=>{
    console.log(`Socket connected with id ${socket.id}`)
    socket.on('profile', (profileObj)=>newProfile(profileObj, socket.id))
    socket.on('get profiles', ()=>socket.emit('send profiles', profileArray))
    socket.on('new room',()=>socket.join(socket.id))
    socket.on('msg to user',(userObj)=>sendMsgToUser(userObj))
})

module.exports = profileArray