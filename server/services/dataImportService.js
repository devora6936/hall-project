const mongoose = require('mongoose');
const xlsx = require('xlsx');
const Person = require('../models/Person');

async function importDataFromExcel(filePath) {
  try {
    // Load Excel file
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert Excel data to JSON
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    // Save each row to MongoDB
    for (const data of jsonData) {
      const person = new Person(data);
      try {
        await person.save();
      } catch (error) {
        console.log('Error saving data:', error);
      }
      
      console.log('Data saved:', data);
    }

    console.log('Data import completed.');
  } catch (error) {
    console.log('Error importing data:', error);
  }
}

module.exports = { importDataFromExcel };
