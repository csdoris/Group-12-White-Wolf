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

// Setup our routes.
import routes from './routes';
app.use('/', routes);


// Serve up frontend build in production
if (process.env.NODE_ENV === 'production') {
    console.log('Running in production!');

    // Make all files in that folder public
    app.use(express.static(path.join(__dirname, '../../frontend/build')));

    // If we get any GET request we can't process using one of the server routes, serve up index.html by default.
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
    });
}


// //example listen to post request
// app.post('/', (req, res) => {
//     const myObj = { message: 'hello world' };
//     res.status(200).send(myObj);
//     console.log('here');
// });

// Connect to MongoDb and if successful start server
Mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(
    app.listen(port, () => {
        console.log(`Listening to requests on http://localhost:${port}`);
    })
);
