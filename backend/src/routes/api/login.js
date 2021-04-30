/**
 * This is a simple RESTful API for dealing with users.
 */

import express from 'express';
import {
    retrieveUserByEmail,
    createUser,
    updateUser
} from '../../database/user-dao';
const jwt = require('jsonwebtoken');

const HTTP_OK = 200; 
const HTTP_NOT_FOUND = 404;
const HTTP_UNAUTHORIZED = 401;

const router = express.Router();

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

// login user
router.post('/', async (req, res) => {
    
    const email = req.body.email
    const password = req.body.password
    //retrieve user info from db
    const dbUser = await retrieveUserByEmail(email);    

    if (dbUser) {
        dbUser.comparePassword(password, (error, match) => {
            if(!match) {
                res.sendStatus(HTTP_UNAUTHORIZED); 
            } else {
                const token = jwt.sign(
                    { userId: dbUser._id }, 
                    process.env.SECRET_KEY,
                    { expiresIn: '24h' });
            
            
                res.status(HTTP_OK)
                    .json({name: dbUser.name, email: dbUser.email, token:token});
            }
        });
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
            name: name,
            email: email
        });
    }
    else {
        // Update our user entry in case the google name changes 
        if (name != dbUser.name) {
            dbUser = await updateUser(dbUser._id, {
                name: name
            });
        }
    }

    // generate a new application token 
    const applicationToken = jwt.sign(
        { userId: dbUser._id },
        process.env.SECRET_KEY,
        { expiresIn: '24h' });

        res.status(HTTP_OK)
        .json({name: dbUser.name, email: dbUser.email, token:applicationToken});
 })
 
export default router;