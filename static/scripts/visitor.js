// window.history.pushState("", "", '/visitor');
const socket = io();
window.addEventListener('load', init)

socket.on('sending msg', (msg)=>{
    console.log(msg)
})


function init(){
    socket.emit('all users', 'visitor')
    socket.emit('notify moderator')
    const questions = document.querySelectorAll('.questions')
    questions.forEach(question=>{
        question.querySelector('button').addEventListener('click', nextQuestion)
    })
}


function nextQuestion(){
    const questions1 = document.querySelectorAll('.questions')
    const setting1 = { 
        action: 'remove',
        name: 'invisible'
    }
    const questions2 = document.querySelectorAll('.questions')
    const setting2 = { 
        action: 'add',
        name: 'invisible'
    }
    const nextElIndex = Number(this.parentElement.classList[1].slice(1))+1
    const setNext = document.querySelector(`.questions.v${nextElIndex}`)
    const setting3 = { 
        action: 'remove',
        name: 'invisible'
    }
    classChange(questions1, setting1)
    classChange(questions2, setting2)
    setChoice(this)
    if(setNext!==null){
        classChange(setNext, setting3)
    }else{
        socket.emit('profile', makeProfileObj())
        socket.emit('new room')
    }
}

function setChoice(el){
    const aside = document.querySelector('aside')
    const userInput = el.parentElement.querySelectorAll('input') 
    if(userInput.length===0){
        const select = el.parentElement.querySelector('select')
        const value = select.value
        const name = select.name
        newElement = `
                    <button class='user-input'>
                        ${value} X
                    </button>
                `
        const container =  aside.querySelector(`.${name}`)
        container.insertAdjacentHTML('beforeend', newElement)
    }
    userInput.forEach(input=>{
        if(input.checked || input.type === 'text'){
            let newElement = ''
            if(input.type === 'text'){
                // Name
                newElement = `
                    <button class='user-input'>
                        ${input.value} X
                    </button>
                ` 
                socket.emit('notify moderator',{type: input.name, value:input.value})   
            }else{
                newElement = `
                    <button class='user-input'>
                        ${input.id} X
                    </button>
                `
                socket.emit('notify moderator',{type: input.name, value:input.id})
            }
            const container =  aside.querySelector(`.${input.name}`)
            container.insertAdjacentHTML('beforeend', newElement)
        }
    })
}

function classChange(el, setting){
    if(el.length>0){
        const elements = Array.from(el)
        elements.forEach(element=>{
            element.classList[setting.action](setting.name)
        })
    }
    else{
        el.classList[setting.action](setting.name)
    }
}

function makeProfileObj(){
    const aside = document.querySelector('aside')
    const languages = Array.from(aside.querySelectorAll('.language button'))
    return {
        name: aside.querySelector('.fullName button').textContent.trim().slice(0, -1).trim(),
        work: aside.querySelector('.work button').textContent.trim().slice(0, -1).trim(),
        languages: languages.map(button=>button.textContent.trim().slice(0, -1).trim()),
        location: aside.querySelector('.location button').textContent.trim().slice(0, -1).trim()
    }
}

