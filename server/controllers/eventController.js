const Event = require('../models/Event');
const https = require('https');

const CreateEvent = async (req, res) => {
    try {
        const { date, eventType, personId, price, coments, speakers, payment } = req.body;
        if (!date || !eventType || !personId || !price)
            return res.status(400).send('fields are required');
        await Event.create({ date, eventType, personId, price, coments, speakers, payment });
        res.send(`event at ${date} was created`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().lean();
        if (!events[0])
            return res.status(400).send('there are no events:(');
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const getEventByDate = async (req, res) => {
    try {
        const { date } = req.params;
        const events = await Event.find({ date: date }).lean().populate("personId", { personname: 1, personType: 1 });
        if (!events[0])
            return res.json([]);
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const getWeekEvent = async (req, res) => {
    try {
        const curr = new Date();
        const first = curr.getDate() - curr.getDay();
        const last = first + 6;
        const firstday = new Date(curr.setDate(first - 1));
        const lastday = new Date(curr.setDate(last));
        const events = await Event.find({
            date: {
                $gte: firstday,
                $lte: lastday
            }
        }).lean().populate("personId", { personname: 1, personType: 1 });
        if (!events[0]) {
            return res.json([]);
        }
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const getEventsInRrange = async (req, res) => {
    try {
        let { firstday, lastday } = req.params;
        firstday = new Date(firstday)
        lastday = new Date(lastday)
        if (!firstday || !lastday)
            return res.status(400).send('fields are require')
        const events = await Event.find({
            date: {
                $gte: firstday,
                $lte: lastday
            }
        }).lean().populate("personId", { personname: 1, personType: 1 });
        if (!events[0]) {
            return res.json([]);
        }
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const updateEvent = async (req, res) => {
    try {
        const { _id, date, eventType, price, coments, speakers, payment } = req.body;
        if (!_id || !date || !eventType || !price)
            return res.status(400).send('fields are required');
        const event = await Event.findById(_id).exec();
        if (!event)
            return res.status(400).send(`there is no event with id ${_id}`);
        event.date = date;
        event.eventType = eventType;
        event.price = price;
        event.coments = coments;
        event.speakers = speakers;
        event.payment = payment;
        await event.save();
        res.send(`event ${event.personId} updated`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id).exec();
        if (!event)
            return res.status(400).send(`there is no event with id ${id}`);
        await event.deleteOne();
        res.send(`event ${event.personId} deleted`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { deleteEvent, getEventByDate, updateEvent, getAllEvents, CreateEvent, getWeekEvent, getEventsInRrange };
