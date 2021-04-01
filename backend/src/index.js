  
const express = require('express');
const app = express();
const path = require("path");
const server = require('http').createServer(app);

// Setup Express
const port = process.env.PORT || 3001;

// Setup body-parser
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Hello World");
  });

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });