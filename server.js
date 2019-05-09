const express       = require('express')
const app           = express()
const bodyParser    = require('body-parser')
const port          = 5000
const router        = require('./routes/router')
const server        = app.listen(port,()=>console.log(`Server is listening to port ${port}`))   
const io            = require('socket.io')(server)
const profileArray  = []
const session       = require('express-session')
const currentOnline = []

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
function addToAll(type, id){
    currentOnline.push({
        type,
        id
    })
}
function notifyMod(value){
    currentOnline.forEach(user=>{
        if(user.type === 'moderator'){
            if(typeof value === 'string'){
                io.sockets.connected[user.id].emit('notify', value);
            }else{
                addPropertyToUser(value)
                // setUpProfile(value)
                io.sockets.connected[user.id].emit('set profile', value);
            }
        }
    })
}

function setUpProfile(obj){
    console.log(currentOnline)
    console.log(obj)
    addPropertyToUser(obj)
    if(obj.type === 'name'){
        
    }
}

function addPropertyToUser(obj){
    currentOnline.forEach(person=>{
        if(person.id===obj.id){
            person[obj.type] = obj.value
        }
    })
    console.log(currentOnline)
}

io.on('connection', (socket)=>{

    // All users (moderators and vistior)
    socket.on('all users', (type)=>addToAll(type, socket.id))
    socket.on('notify moderator', (obj)=>{
        if(obj === undefined){
            notifyMod(socket.id)
        }
        else{
            obj.id = socket.id
            notifyMod(obj)
        }
    })

    // Users profile(old version)
    socket.on('profile', (profileObj)=>newProfile(profileObj, socket.id))
    socket.on('get profiles', ()=>socket.emit('send profiles', profileArray))

    // Room for vistor to chat with moderator 
    socket.on('new room',()=>socket.join(socket.id))
    socket.on('msg to user',(userObj)=>sendMsgToUser(userObj))
    socket.on('disconnect', ()=>console.log(`User with Id ${socket.id} has disconnected`))
})

module.exports = {profileArray,currentOnline}