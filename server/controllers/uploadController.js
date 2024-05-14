const multer = require('multer');
const path = require('path');
const { importDataFromExcel } = require('../services/dataImportService'); // Adjust the path as needed

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append extension
    }
});

const upload = multer({ storage: storage }).single('file');

const uploadFile = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Error uploading file:', err);
            return res.status(500).send('Error uploading file');
        }

        // File uploaded successfully, now import data
        try {
            await importDataFromExcel(req.file.path);
            res.status(200).json({
                message: 'File uploaded and data imported successfully',
                file: req.file
            });
        } catch (importError) {
            console.error('Error importing data:', importError);
            res.status(500).send('Error importing data');
        }
    });
};

module.exports = {
    uploadFile
};
