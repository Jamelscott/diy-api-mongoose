const mongoose = require('mongoose')
//make Schema
//Comments
const commentSchema = new mongoose.Schema({
    name: String,
    content: String,
})
//Users
const userSchema = new mongoose.Schema({
    name: String,
    title: String,
    content: String,
    comments: [commentSchema]
})

//make model and export it
module.exports = mongoose.model('User', userSchema)