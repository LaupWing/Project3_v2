// window.history.pushState("", "", '/moderator'); 
const socket = io();

window.addEventListener('load', init)

function init(){
    socket.emit('get profiles')
    socket.on('send profiles', (profileArray)=>{console.log(profileArray)})
    const form = document.querySelector('.chat form')
    form.addEventListener('submit', sendMsgToUser)
    setActive()
}

function setActive(){
    const allLi = document.querySelectorAll('ul.profiles li')
    allLi.forEach((li,index)=>{
        li.addEventListener('click', openChat)
        if(index === 0) li.classList.add('active')
    })
    const allChats = document.querySelectorAll('.chat')
    allChats.forEach((chat,index)=>{
        if(index !== 0){
            chat.classList.add('invisible')
        }
    })
}

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