require('dotenv').config();
const jwt = require('jsonwebtoken');
const { SECRET } = process.env;

module.exports = {
  isAuthenticated: (req, res, next) => {
    //get Authentication header info on request protected info. Assign to headerToken.
    const headerToken = req.get('Authorization');

    //something is perhaps wrong with server...
    if (!headerToken) {
      console.log('Error IN auth middleware');
      res.sendStatus(401);
    }

    let token;

    try {
      //jwt decodes and checks the Auth Token against the SECRET in .env
      token = jwt.verify(headerToken, SECRET);
    } catch (err) {
      err.statusCode = 500;
      throw err;
    }
    //if verify() return is undefined throw error message
    if (!token) {
      const error = new Error('Not authenticated.');
      error.statusCode = 401;
      throw error;
    }

    //if verify check passes execute next function
    next();
  },
};
