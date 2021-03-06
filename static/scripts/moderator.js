// window.history.pushState("", "", '/moderator'); 
const socket = io();

window.addEventListener('load', init)

function init(){
    socket.emit('all users', 'moderator')
}


socket.on('notify', (id)=>newVisitor(id))
socket.on('set profile', (obj)=>setProfile(obj))
socket.on('user finished', (obj)=>userFinished(obj))
socket.on('sending users msg', (obj)=>setUsersMsg(obj))

function sendMsgToUser(){
    event.preventDefault()
    const allLi = Array.from(document.querySelectorAll('ul.profiles li'))
    console.log(allLi)
    // const id = allLi.map(li=>{
    //     if(li.classList[1]==='active'){
    //         console.log(li.classList)
    //         return li.classList[0]
    //     }
    // })[0]
    const id = allLi.map(li=>{
        if(li.classList[1]==='active'){
            return li
        }
    })
    .filter(li=>li!==undefined)[0]
    .classList[0]
    console.log(id)
    const msg = document.querySelector(`.chat#${id} form.sendMsg input`).value
    document.querySelector(`.chat#${id} form.sendMsg input`).value = ''
    const container = document.querySelector(`.chat#${id} .messages`)
    const newElement = `
        <li class="mod-msg">
            <p>${msg}</p>
        </li>
    `
    const msgObj = {
        msg,
        id: id.slice(2)
    }
    socket.emit('send msg to user', msgObj)
    container.insertAdjacentHTML('beforeend', newElement)
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
    const allChats          = document.querySelectorAll('.chat-container .chat')
    const id                = this.classList[0]
    const allForms          = document.querySelectorAll('.form-container form')
    containerProfiles.forEach(profile=>profile.classList.remove('active'))
    this.classList.add('active')

    allChats.forEach(chat=>{
        if(!Array.from(chat.classList).includes('invisible')) chat.classList.add('invisible')
    })
    allChats.forEach(chat=>{
        if(id === chat.id){
            chat.classList.remove('invisible')
        }
    })

    allForms.forEach(form=>{
        if(!Array.from(form.classList).includes('invisible')) form.classList.add('invisible')
    })
    allForms.forEach(form=>{
        const formId = form.classList[1]
        if(id === formId){
            form.classList.remove('invisible')
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
    addingForm(id)
}

function addingForm(id){
    const newElement=`
    <form class="user-info id${id} invisible" action="">
        <div class="fullName">
            <label for="">Name</label>
            <input type="text">
        </div>
        <div class="work">
            <label for="">Work</label>
            <input type="text">
        </div>
        <div class="language">
            <label for="">Programmeertalen</label>
            <input type="text">
        </div>
        <div class="location">
            <label for="">Locatie</label>
            <input type="text">
        </div>
    </form>
    `
    document.querySelector('.form-container').insertAdjacentHTML('beforeend', newElement)
}

function setProfile(obj){
    if(obj.type === 'fullName'){
        document.querySelector(`li.id${obj.id}`).textContent = `${obj.value} is bezig met invullen`
        document.querySelector(`.chat#id${obj.id} h2`).textContent = obj.value
        document.querySelector(`.form-container .id${obj.id} .fullName input`).value = obj.value
    }
    else if(obj.type === 'work'){
        document.querySelector(`.form-container .id${obj.id} .work input`).value = obj.value
    }
    else if(obj.type === 'language'){
        document.querySelector(`.form-container .id${obj.id} .language input`).value = obj.value
    }
    else if(obj.type === 'location'){
        document.querySelector(`.form-container .id${obj.id} .location input`).value = obj.value
    }
}

function userFinished(obj){
    const chatContainer = document.querySelector(`.chat#id${obj.id}`)
    chatContainer.removeChild(chatContainer.querySelector('.overlay'))
    chatContainer.querySelector('.user h2').textContent = obj.fullName
    chatContainer.querySelector('.user p').textContent = obj.location
    const user = document.querySelector(`ul.profiles li.id${obj.id}`)
    user.classList.remove('busy')
    const allForm = document.querySelectorAll('.chat form')
    allForm.forEach(form=>{
        form.removeEventListener('submit', sendMsgToUser)
        form.addEventListener('submit', sendMsgToUser)
    })
    user.textContent = obj.fullName
}

function setUsersMsg(obj){
    const container = document.querySelector(`.chat#id${obj.id} .messages`)
    const newElement = `
        <li class="visitor-message">
            <p>${obj.msg}</p>
        </li>
    `
    container.insertAdjacentHTML('beforeend', newElement)
}