/**
 * This is a simple RESTful API for dealing with users.
 */

 import express from 'express';
 import {
    createUser
} from '../../database/user-dao';

 // const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
 const HTTP_CREATED = 201;
 const HTTP_NOT_FOUND = 404;
 const HTTP_NO_CONTENT = 204;
 
 const router = express.Router();
 
 // Create new user
 //TODO auth token
 router.post('/', async (req, res) => {
    const newUser = await createUser({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    res.status(HTTP_CREATED)
        .header('Location', `/api/articles/${newUser._id}`)
        .json(newUser);
 })
 
 export default router;