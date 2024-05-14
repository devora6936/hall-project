const express=require('express')
const router=express()
const eventController=require('../controllers/eventController')

router.get('/', eventController.getAllEvents)
router.post('/', eventController.CreateEvent)
router.put('/', eventController.updateEvent)
router.delete('/:id',eventController.deleteEvent)
router.get('/byDate/:date',eventController.getEventByDate)
router.get('/byRange/:firstday/:lastday',eventController.getEventsInRrange)
router.get('/byWeek',eventController.getWeekEvent)

module.exports=router
