const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json())
// Enable CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-api-key");
    next();
});

app.post('/api/create-file', (req, res) => {
    const folderPath = './postFolder'; // Specify your desired folder path
    const currentDate = new Date().toISOString().replace(/:/g, '-'); // Get current date and time
    const fileName = `${currentDate}.txt`; // Use current date and time as the filename

    fs.writeFile(`${folderPath}/${fileName}`, JSON.stringify(req.body), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error writing file.');
        } else {
            console.log('File created successfully!');
            res.status(200).send('File created successfully!');
        }
    });
});

app.get('/api/files', (req, res) => {
    const folderPath = './postFolder';
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading directory.');
        } else {
            const textFiles = files.filter(file => file.endsWith('.txt'));
            res.status(200).json(textFiles);
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
