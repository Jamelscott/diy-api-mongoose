const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

app.use('/blog', require('./controllers/blog'))
app.use('/comment', require('./controllers/comment'))


app.listen(8000,()=>{
    "You're listeing to port 8000"
})