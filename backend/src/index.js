const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const Mongoose = require('mongoose');

// Setup environment variables
require('dotenv').config();

// Setup Express
const port = process.env.PORT || 3001;

// Setup MongoDb URI
const mongoURI = process.env.ATLAS_URI || process.env.MONGODB_URI;

// Setup body-parser
app.use(express.json());

// Serve up frontend build in production
if (process.env.NODE_ENV === 'production') {
    console.log('Running in production!');

}

//example listen to post request
app.post('/', (req, res) => {
    const myObj = { message: 'hello world' };
    res.status(200).send(myObj);
    console.log('here');
});

// Connect to MongoDb and if successful start server
Mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(
    app.listen(port, () => {
        console.log(`Listening to requests on http://localhost:${port}`);
    })
);
