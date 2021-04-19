/**
 * This is a simple RESTful API for dealing with users.
 */

 import express from 'express';

 // const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
 const HTTP_CREATED = 201;
 const HTTP_NOT_FOUND = 404;
 const HTTP_NO_CONTENT = 204;
 
 const router = express.Router();
 
 // Create new user
 router.post('/', async (req, res) => {
    const newArticle = await createUser({
        username: req.body.username,
        image: req.body.image,
        content: req.body.content
    });

    res.status(HTTP_CREATED)
        .header('Location', `/api/articles/${newArticle._id}`)
        .json(newArticle);
 })
 
 export default router;