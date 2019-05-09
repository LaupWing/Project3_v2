// window.history.pushState("", "", '/moderator'); 
const socket = io();

window.addEventListener('load', init)

function init(){
    socket.emit('all users', 'moderator')
    socket.emit('get profiles')
    socket.on('send profiles', (profileArray)=>{console.log(profileArray)})
    // const form = document.querySelector('.chat form')
    // form.addEventListener('submit', sendMsgToUser)
}


socket.on('notify', (id)=>newVisitor(id))
socket.on('set profile', (obj)=>setProfile(obj))


function sendMsgToUser(){
    event.preventDefault()
    let inputVal = this.querySelector('input').value
    const lis = Array.from(document.querySelectorAll('li'))
    const id = lis.map(li=>{
        console.log(li.classList)
        if(!Array.from(li.classList).includes('invisible')){
            return li
        }
    })[0].id
    
    const msgObj = {
        msg: inputVal,
        id
    }
    socket.emit('msg to user', msgObj) 
}

function openChat(){
    const id = this.classList[0]
    const allChats = document.querySelector('.chat')
    allChats.forEach
}

// All socket functions
function newVisitor(id){
    // Setting up chat
    const containerChat = document.querySelector('.chat-container')
    if(containerChat.querySelector('.no-visitors') !== null){
        containerChat.removeChild(containerChat.querySelector('.no-visitors'))
    }
    addingChat(id)
    const containerProfiles = document.querySelector('ul.profiles')
    const newElement = `
        <li class="id${id} busy">
            Bezoeker is bezig met invullen
        </li>
    `
    containerProfiles.insertAdjacentHTML('beforeend', newElement)
    addingEvents()
}

function addingEvents(){
    const allLi = document.querySelectorAll('ul.profiles li')
    allLi.forEach(li=>li.removeEventListener('click', seeChat))
    allLi.forEach(li=>li.addEventListener('click', seeChat))
}

function seeChat(){
    const containerProfiles = document.querySelectorAll('ul.profiles li')
    containerProfiles.forEach(profile=>profile.classList.remove('active'))
    this.classList.add('active')
    const allChats = document.querySelectorAll('.chat-container .chat')
    allChats.forEach(chat=>{
        if(!Array.from(chat.classList).includes('invisible')) chat.classList.add('invisible')
    })
    allChats.forEach(chat=>{
        if(this.classList[0] === chat.id){
            chat.classList.remove('invisible')
        }
    })
}

function addingChat(id){
    const newElement = `
    <div class="chat invisible" id="id${id}">
        <div class="overlay">
            <h2 class="busy">Bezoeker is nog bezig</h2>
        </div>
        <div class="user">
            <h2>Naam</h2>
            <p>Woonplaats</p>
        </div>
        <div class="messages">

        </div>
        <form action="" class="sendMsg">
            <input type="text">
            <button type="submit">Send</button>
        </form>
    </div>
    `
    document.querySelector('.chat-container').insertAdjacentHTML('beforeend', newElement)
}

function setProfile(obj){
    console.log(obj)
    if(obj.type === 'fullName'){
        document.querySelector(`.id${obj.id}`).textContent = `${obj.value} is bezig met invullen`
        document.querySelector(`#id${obj.id} h2`).textContent = obj.value
    }
}