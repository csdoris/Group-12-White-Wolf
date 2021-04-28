/**
 * This is a simple RESTful API for dealing with users.
 */

import express from 'express';
import {
    retrieveUserByEmail,
    createUser
} from '../../database/user-dao';
const jwt = require('jsonwebtoken');

// const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

const router = express.Router();

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

// login user
router.post('/', async (req, res) => {
    
    const email = req.body.email
    const password = req.body.pasword
    //retrieve user info from db
    const dbUser = await retrieveUserByEmail(email);    

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

 // login user
 router.post('/google', async (req, res) => {
    const token  = req.headers.authorization.split(" ")[1]; 
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    }).catch(function (err) {
        console.log(err);
    });

    const { name, email } = ticket.getPayload();    
    
    // check if this user login to the system before
    let dbUser = await retrieveUserByEmail(email); 
    if (!dbUser) {
        // create a new user entry
        dbUser = await createUser({
            username: name,
            email: email
        });
    }

    // generate a new application token 
    const applicationToken = jwt.sign(
        { userId: dbUser._id },
        process.env.SECRET_KEY,
        { expiresIn: '24h' });

    res.status(HTTP_CREATED)
        .header('Location', `/api/users/${dbUser._id}`)
        .json({user: dbUser, token:applicationToken});
 })
 
export default router;