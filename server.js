const express    = require('express')
const app        = express()
const bodyParser = require('body-parser')
const port       = 5000
const router     = require('./routes/router')
app
    .set('views', 'view')
    .set('view engine', 'ejs')
    .use(express.static('static'))
    .use(bodyParser.urlencoded({extended:true}))
    .use(bodyParser.json())
    .use('/', router)
    .listen(port,()=>console.log(`Server is listening to port ${port}`))
