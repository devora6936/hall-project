const Cleaner = require('../models/Cleaner');


const createCleaner = async (req, res) => {
    try {
        const { username, email, phone} = req.body;
        if (!username)
            return res.status(400).send(`missing required fields`);
        const tmp = await Cleaner.find({ username: username });
        if (tmp.length !== 0)
            return res.status(400).send(`duplicate fields`);
        await Cleaner.create({ username, email, phone});
        res.send(`cleaner ${username} was created`);
    } catch (error) {
        console.error(error);
        res.status(400).send('Bad Request');
    }
};

const getAllCleaner = async (req, res) => {
    try {
        const cleaners = await Cleaner.find().lean();
        if (!cleaners[0])
            return res.status(404).send('No cleaners found');
        res.json(cleaners);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const updateCleaner = async (req, res) => {
    try {
        const { _id, username, email, phone} = req.body;
        if (!_id || !username)
            return res.status(400).send('fields are required');
        const cleaner = await Cleaner.findById(_id).exec();
        if (!cleaner)
            return res.status(404).send(`Cleaner not found`);
        if (username !== cleaner.username) {
            const tmp = await Cleaner.find({ username: username }).lean();
            if (tmp.length !== 0)
                return res.status(400).send(`duplicate fields`);
        }
        cleaner.username = username;
        cleaner.email = email;
        cleaner.phone = phone;
        await cleaner.save();
        res.send(`cleaner ${cleaner.username} updated`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const deleteCleaner = async (req, res) => {
    try {
        const { id } = req.params;
        const cleaner = await Cleaner.findById(id).exec();
        if (!cleaner)
            return res.status(404).send(`Cleaner not found`);
        await cleaner.deleteOne();
        res.send(`cleaner ${cleaner.username} deleted`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { deleteCleaner, updateCleaner, getAllCleaner, createCleaner };
