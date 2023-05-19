import jwt from "jsonwebtoken";
import User from '../models/User.js';

export const verifyToken = async (req, res, next) => {

  const JWT_SECRET = 'lolomatrix'
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Hi the isAccess Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const checkRole = (role) => {
  return async function(req, res, next) {
    try {
      const user = await User.findById(req.user.id).select('role');
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      if (user.role === role) {
        // The user has the required role, so proceed to the next middleware
        next();
      } else {
        // The user does not have the required role, so send an error response
        res.status(401).json({ message: 'Non autorisé!' });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
};

