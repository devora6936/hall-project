const Person = require('../models/Person');
const dataImportService = require('../services/dataImportService');

const importData = async (req, res) => {
    try {
        const { filePath } = req.body;
        await dataImportService.importDataFromExcel(filePath);
        res.send('Data import completed.');
    } catch (error) {
        console.error(error);
        if (error.code === 'ENOENT') {
            res.status(404).send('File not found.');
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
};

const createPerson = async (req, res) => {
    try {
        const { personname, email, phone, personType, phone2 } = req.body;
        if (!personname)
            return res.status(400).send(`missing required fields`);
        const tmp = await Person.find({ personname: personname });
        if (tmp.length !== 0)
            return res.status(400).send(`duplicate fields`);
        await Person.create({ personname, email, phone, personType, phone2 });
        res.send(`person ${personname} was created`);
    } catch (error) {
        console.error(error);
        res.status(400).send('Bad Request');
    }
};

const getAllPerson = async (req, res) => {
    try {
        const persons = await Person.find().lean();
        if (!persons[0])
            return res.status(404).send('No persons found');
        res.json(persons);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const updatePerson = async (req, res) => {
    try {
        const { _id, personname, email, phone, personType, phone2 } = req.body;
        if (!_id || !personname)
            return res.status(400).send('fields are required');
        const person = await Person.findById(_id).exec();
        if (!person)
            return res.status(404).send(`Person not found`);
        if (personname !== person.personname) {
            const tmp = await Person.find({ personname: personname }).lean();
            if (tmp.length !== 0)
                return res.status(400).send(`duplicate fields`);
        }
        person.personname = personname;
        person.email = email;
        person.phone = phone;
        person.phone2 = phone2;
        person.personType = personType;
        await person.save();
        res.send(`person ${person.personname} updated`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const deletePerson = async (req, res) => {
    try {
        const { id } = req.params;
        const person = await Person.findById(id).exec();
        if (!person)
            return res.status(404).send(`Person not found`);
        await person.deleteOne();
        res.send(`person ${person.personname} deleted`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { deletePerson, updatePerson, getAllPerson, createPerson, importData };
