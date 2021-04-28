/**
 * This is a simple RESTful API for dealing with users.
 */

 import express from 'express';
 import {
    createUser
} from '../../database/user-dao';
const jwt = require('jsonwebtoken');


 // const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
 const HTTP_CREATED = 201;
 const HTTP_NOT_FOUND = 404;
 const HTTP_NO_CONTENT = 204;
 const HTTP_BAD_REQUEST = 400;

 
 const router = express.Router();
 
 // Create new user
 router.post('/', async (req, res) => {
    try {
        await createUser({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
        });
        res.sendStatus(HTTP_CREATED);
    } catch (err) {
        res.status(HTTP_BAD_REQUEST);
    }

 })
 
 export default router;