/**
 * This is a simple RESTful API for dealing with users.
 */

 import express from 'express';

 // const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
 const HTTP_CREATED = 201;
 const HTTP_NOT_FOUND = 404;
 const HTTP_NO_CONTENT = 204;
 
 const router = express.Router();
 
 // login user
 router.post('/', async (req, res) => {
    const username = req.body.username
    const password = req.body.pasword
    //retrieve user info from db
    const dbUser = await retrieveUser(username);    
    
    
     res.status(HTTP_CREATED)
         .header('Location', `/api/users/${newUser._id}`)
         .json(newUser);
 })
 
 export default router;