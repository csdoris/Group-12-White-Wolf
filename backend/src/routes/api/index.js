import express from 'express';

const router = express.Router();

import login from './login';
router.use('/login', login);

import signup from './signup';
router.use('/signup', signup);

import plans from './plans';
router.use('/plans', plans);

export default router;