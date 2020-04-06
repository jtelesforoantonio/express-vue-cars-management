const jwt = require('jwt-simple');
const moment = require('moment');

exports.generateToken = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    tokenCreatedAt: moment().unix(),
    tokenExpiredAt: moment().add(1, 'days').unix()
  };

  return jwt.encode(payload, 'secret');
};
