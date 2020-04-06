const jwt = require('jwt-simple');
const moment = require('moment');

exports.auth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({errors: ['Unauthorized']})
  }
  try {
    const token = req.headers.authorization.substr(7);
    const payload = jwt.decode(token, 'secret');
    if (payload.tokenExpiredAt <= moment().unix()) {
      return res.status(401).json({errors: ['Unauthorized']})
    }
    req.user = payload
  } catch (error) {
    return res.status(401).json({errors: ['Unauthorized']})
  }

  next()
};
