const db = require('../models')
const { rawListeners } = require('../models/user')

const router = require('express').Router()



//GET - view a single blog post
router.get('/:id', async (req, res)=>{
try{

  const {id} = req.params
// console.log(id)
  const blog = await db.User.findOne({
    "comments._id": id
  })
  // console.log(blog)

const comment = await blog.comments.id(id)
    
console.log(comment)
res.json(comment)




} catch (err){
  console.log(err)
}

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