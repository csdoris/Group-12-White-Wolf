/**
 * This is a simple RESTful API for dealing with plans.
 */

import express from 'express';
import {
    retrieveUserById,
} from '../../database/user-dao';

const HTTP_NOT_FOUND = 404;

const router = express.Router();

// Retrieve single user
router.get('/', async (req, res) => {
    const id = req.body.user_id;

    const user = await retrieveUserById(id);

    if (user) {
        res.json({ 
            name: user.name, 
            email: user.email 
        });
    }
    else {
        res.sendStatus(HTTP_NOT_FOUND);
    }
});

export default router;