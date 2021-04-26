/**
 * This is a simple RESTful API for dealing with users.
 */

import express from 'express';
import {
    retrieveUser
} from '../../database/user-dao';
const jwt = require('jsonwebtoken');

// const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

const router = express.Router();

// login user
router.post('/', async (req, res) => {
    const email = req.body.email
    const password = req.body.pasword
    //retrieve user info from db
    const dbUser = await retrieveUser(email);    

    if (dbUser) {
        const token = jwt.sign(
            { userId: dbUser._id }, 
            process.env.SECRET_KEY,
            { expiresIn: '24h' });
    
    
        res.status(HTTP_CREATED)
            .header('Location', `/api/users/${dbUser._id}`)
            .json({user: dbUser, token:token});
    } else {
        res.sendStatus(HTTP_NOT_FOUND);
    }

})

export default router;