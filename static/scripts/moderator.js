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
        console.log(id, formId)
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
    console.log(obj)
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