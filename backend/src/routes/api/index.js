import express from 'express';
import auth from '../../middleware/auth';
const router = express.Router();

import login from './login';
router.use('/login', login);

import signup from './signup';
router.use('/signup', signup);

import user from './user';
router.use('/user', auth, user);

import plans from './plans';
router.use('/plans', auth , plans);

import apikeys from './apikeys';
router.use('/apikeys', apikeys);

import weather from './weatherApi';
router.use('/weather', weather);

export default router;
