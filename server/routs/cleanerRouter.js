const express=require('express')
const router=express.Router()
const cleanerController=require('../controllers/cleanerController')

router.get('/',cleanerController.getAllCleaner)
router.post('/',cleanerController.createCleaner)
router.put('/',cleanerController.updateCleaner)
router.delete('/',cleanerController.deleteCleaner)

module.exports=router
