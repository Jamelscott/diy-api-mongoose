const db = require('../models')
const { rawListeners } = require('../models/user')

const router = require('express').Router()



//GET - view a single blog post
router.get('/:id', async (req, res)=>{

    const {id} = req.params
    console.log(id)

    db.User.findById(id)
    .then(user=>{
        console.log(user)
        if(!user)return res.status(404).json({message: "user not found"})
            res.json(user)
    })
    .catch(err=>{
        console.log(err)
        res.json({comment: "what happened"})
    })
})

//PUT -- updates a comment @ :id
router.put('/:id', async (req, res)=>{
    try {
        const blog = await  db.User.findOne({ 
          "comments._id": req.params.id
        })
        const comment = await blog.comments.id(req.params.id)
    
        comment.content = req.body.content
    
        await blog.save()
    
        res.json(blog)
      } catch (err) {
        console.log(err)
        res.status(503).json({ msg: 'err' })
      }
})


//Delete
router.delete('/:id', async(req, res)=>{
    try {
        const blog = await  db.User.findOne({ 
          "comments._id": req.params.id
        })
        blog.comments.id(req.params.id).remove()
      
        await blog.save()
      
        res.json(blog)
       } catch (err) {
         console.log(err)
         res.status(503).json({ msg: 'error' })
       }
})

    

module.exports = router