const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
    res.render('index', {page:'./partials/login'})
})

router.post('/loggedin',(req,res)=>{
    if(req.body.username === 'moderator'){
        const profileArray = require('../server')
        res.render('index', {page: './partials/moderator', data: profileArray})
    }
    else if (req.body.username === 'visitor'){
        res.render('index', 
            {
                page:'./partials/visitor',
                partial: './visitor-partials/questions' 
            }
            )
    }
})

router.get('/visitor',(req,res)=>{
    res.render('index', 
            {
                page:'./partials/visitor',
                partial: './visitor-partials/questions' 
            }
    )
})


module.exports = router