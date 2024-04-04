const express=require('express')
const router=express.Router()
const personController=require('../controllers/personController')

router.get('/',personController.getAllPerson)
router.post('/',personController.createPerson)
router.post('/loadPeople',personController.importData)
router.put('/',personController.updatePerson)
router.delete('/',personController.deletePerson)

module.exports=router