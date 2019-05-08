window.history.pushState("", "", '/visitor');
window.addEventListener('load', init)
function init(){
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
    const nextEl = Number(this.parentElement.classList[1].slice(1))+1
    const setNext = document.querySelector(`.questions.v${nextEl}`)
    const setting3 = { 
        action: 'remove',
        name: 'invisible'
    }
    classChange(questions1, setting1)
    classChange(questions2, setting2)
    classChange(setNext, setting3)
    setChoice(this)
}

function setChoice(el){
    const aside = document.querySelector('aside')
    const userInput = el.parentElement.querySelectorAll('input')
    userInput.forEach(input=>{
        if(input.checked){
            const newElement = `
                <button class='user-input'>
                    ${input.id} X
                </button>
            `
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


