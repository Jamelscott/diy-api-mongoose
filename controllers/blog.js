const db = require('../models')

const router = require('express').Router()

// GET - view all blog posts
router.get('/', (req, res)=>{
    db.User.find({})
    .then(posts =>{
        console.log(posts)
        res.json(posts)
    })
    .catch(err=>{
        console.log(err)
    })
})



//GET - view a single blog post
router.get('/:id', (req, res)=>{
    const {id} = req.params

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


//POST - post a blog
router.post('/', (req, res)=>{
    db.User.create(req.body)
    .then(post =>{
        console.log(post)
        res.json(post)
    })
    .catch(err=>{
        console.log(err)
    })
})


//PUT - update a blog post

router.put('/:id', (req, res)=>{

    const id = req.params.id
    db.User.findByIdAndUpdate({
        _id: id
    },req.body, {new: true})
    .then(update =>{
        console.log(update)
        res.json(update)
    })
    .catch(err=>{console.log(err)})

})

//DELETE - delete a post

router.delete('/:id', (req, res)=>{
    const id = req.params.id

    db.User.findByIdAndDelete({
        _id: id
    })
    .then(()=>{
        res.status(204).json({message: "the bounty was deleted"})
    })
    .catch(err=>{console.log(err)})

})

//create a comment
router.post('/:id/comment', async (req, res)=>{
    try {
        //find the blog at :id 
        const blog = await db.User.findById(req.params.id)
        // push it to the blog's comment array
        blog.comments.push(req.body)
        //save the blog
        await blog.save()
        //send the blog back
        res.json(blog)
    } catch(err){
        console.log(err)
        res.status(503).json({message: "error"})
    }
})

module.exports = router