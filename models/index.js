const mongoose = require('mongoose')

mongoose.connect(`mongodb://localhost/blogsite`)

const db = mongoose.connection

db.once('open', ()=>{
    console.log(`mongoose connect at ${db.host}:${db.port}`)
})

db.on('error', (err)=>{
    console.log(`oh no, something has gone terribly wrong`)
    console.log(err)
})

module.exports.User = require('./user')