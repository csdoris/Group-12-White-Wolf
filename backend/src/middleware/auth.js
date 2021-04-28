import {
  retrieveUserById  
} from '../database/user-dao';
const jwt = require('jsonwebtoken');

export default async function auth(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;
    const dbUser = await retrieveUserById(userId);    

    if (!dbUser) {
      throw 'Invalid user ID';
    } else {
      req.body.user_id = dbUser._id; 
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
 