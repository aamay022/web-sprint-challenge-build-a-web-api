// Write your "projects" router here!
const express = require('express')

const Projects = require('./projects-model')

const router = express.Router();

const {
    logRouter,
    errorHandling
} = require('./projects-middleware');


router.use(logRouter)
router.use(errorHandling);

router.get('/', (req,res, next)=> {
    Projects.get()
    .then(p => {
        res.status(200).json(p)
    })
    .catch(err => {

    })
})

router.get('/:id', async (req,res)=> {
    try{
        const project = await Projects.get(req.params.id)
        if(!project){
        res.status(404).json({
            message: 'No project found'
        })
        }else{
            res.json(project)
        }
    } catch(err) {
        res.status(500).json({
            error:err.message
        })
    }   
    })

router.post('/', async (req,res)=> {
    try{
        const newProj = await Projects.insert(req.body)
        if(!req.body.name || !req.body.description){
            res.status(400).json({
                message: "missing fields"
            })
        }else{
        res.json(newProj)
        }
    } catch (err){
        res.status(400).json({
            error:err.message
        })
    }
})

router.put('/:id', async (req,res) => {
   try{
       const updatedProject = await Projects.update(req.params.id, req.body)
       if(!updatedProject){
           res.status(404).json({
               message: "Project not found"
           })
       } else if(!req.body.name || !req.body.description ) {
        res.status(400).json({
            message: "missing fields"
        })
       }else{
           res.json(updatedProject)
       }
       }catch(err){
           res.status(400).json({
               message:"The project could not be modified"
           })
       }
   }
)

router.delete('/:id', (req,res)=>{
    Projects.remove(req.params.id)
    .then(deletedProject =>{
        if(deletedProject){
            res.status(200).json({
                message: 'project deleted'
            })
        }else{
            res.status(404).json({
                message:"couldn't find project"
            })
        }
    })
})

router.get('/:id/actions', async (req,res)=> {
    
    Projects.getProjectActions(req.params.id)
    .then(a=>{
        res.json(a)
    })

})

module.exports = router;