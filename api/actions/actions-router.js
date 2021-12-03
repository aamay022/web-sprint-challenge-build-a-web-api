// Write your "actions" router here!
const express = require('express')

const Actions = require('./actions-model')

const router = express.Router();

router.get('/', (req,res)=>{
    Actions.get()
    .then(a => {
        res.json(a)
    })
    .catch(err => {

    })
})

const {
    logRouter,
    errorHandling
} = require('./actions-middlware');


router.use(logRouter)
router.use(errorHandling);


router.get('/:id', async (req,res)=>{
    try{
        const action = await Actions.get(req.params.id)
        if(!action){
        res.status(404).json({
            message: 'No action found'
        })
        }else{
            res.json(action)
        }
    } catch(err) {
        res.status(500).json({
            error:err.message
        })
    }   
})

router.post('/', async (req,res)=> {
    try{
        const newAction = await Actions.insert(req.body)
        if(!req.body.notes || !req.body.description){
            res.status(400).json({
                message: "missing fields"
            })
        }else{
        res.json(newAction)
        }
    } catch (err){
        res.status(400).json({
            error:err.message
        })
    }
})

router.put('/:id', async (req,res) => {
    try{
        const updatedAction = await Actions.update(req.params.id, req.body)
        if(!updatedAction){
            res.status(404).json({
                message: "Action not found"
            })
        }else if (!req.body.notes || !req.body.description){
         res.status(400).json({
             message: "missing fields"
         })
        }else{
            res.json(updatedAction)
        }
        }catch(err){
            res.status(400).json({
                message:"The Action could not be modified"
            })
        }
    }
 )

 router.delete('/:id', async(req,res)=>{
    Actions.remove(req.params.id)
    .then(deletedAction =>{
        if(deletedAction){
            res.status(200).json({
                message: 'action deleted'
            })
        }else{
            res.status(404).json({
                message:"couldn't find action"
            })
        }
    })
 })
module.exports = router;