/**
 * This is a simple RESTful API for fetching API keys from the backend.
 */

import express from 'express';

const HTTP_OK = 200;
const HTTP_NOT_FOUND = 404;

const router = express.Router();

// Fetch Google API key
router.get('/googlekey', async (req, res) => {
    let key = { googleAPIKey: process.env.GOOGLE_MAPS_API_KEY };

    if (key) {
        res.status(HTTP_OK).json(key);
    } else {
        res.status(HTTP_NOT_FOUND);
    }
});

export default router;
