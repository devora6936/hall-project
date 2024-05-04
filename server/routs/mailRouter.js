const express=require('express')
const router=express()
const mailController=require('../controllers/mailController')

router.post('/', mailController.sendEmailController)

module.exports = router;
