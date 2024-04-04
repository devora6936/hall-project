const Person = require('../models/Person')
const dataImportService = require('../services/dataImportService');

const importData=async (req, res) =>{
  const {filePath} = req.body;
  await dataImportService.importDataFromExcel(filePath);
  res.send('Data import completed.');
}

const createPerson = async (req, res) => {
    const { personname, email, phone,personType,phone2 } = req.body
    if (!personname )
        return res.status(400).send(`missing required fields`)
    const tmp = await Person.find( { personname: personname })
    if (tmp.length != 0)
        return res.status(400).send(`duplicate fields`)
    await Person.create({ personname, email, phone,personType,phone2 })
    res.send(`person${personname} was created`)
}

const getAllPerson = async (req, res) => {
    const persons = await Person.find().lean()
    if (!persons[0])
        return res.status(400).send('there are no persons:(')
    res.json(persons)
}

const updatePerson = async (req, res) => {
    const { _id, personname, email, phone, personType ,phone2} = req.body
    if (!_id  || !personname)
        return res.status(400).send('fields are required')
    const person = await Person.findById(_id).exec()
    if (!person)
        return res.status(400).send(`there is no person with id ${id}`)
    if (personname != person.personname) {
        const tmp=await Person.find({ personname: personname }).lean()
        if (tmp.length != 0)
            return res.status(400).send(`duplicate fields`) 
    }
    person.personname = personname
    person.email = email
    person.phone = phone
    person.phone2 = phone2
    person.personType = personType
    await person.save()
    res.send(`person ${person.personname} updated`)
}

const deletePerson = async (req, res) => {
    const { id } = req.params
    const person = await Person.findById(id).exec()
    if (!person)
        return res.status(400).send(`there is no person with id ${id}`)
    await person.deleteOne()
    res.send(`person ${user.personname} deleted`)
}

module.exports = { deletePerson, updatePerson, getAllPerson, createPerson,importData }