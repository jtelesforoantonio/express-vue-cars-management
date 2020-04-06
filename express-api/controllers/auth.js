const models = require('../models');
const authService = require('../services/auth');

const AuthController = {
  async login(req, res) {
    try {
      const response = authService.validateData(req.body);
      if (response.success) {
        const user = await models.User.findOne({
          where: {
            email: req.body.email,
            deletedAt: null
          }
        });
        const auth = await authService.login(user, req);
        if (auth.status === 200) {
          res.status(200).json(auth.user);
        } else {
          res.status(auth.status).json({errors: auth.errors});
        }
      } else {
        res.status(422).json({errors: response.errors});
      }
    } catch (e) {
      res.status(500).json({errors: ['Ocurrió un error inesperado, inténtalo de nuevo']});
    }
  }
};

module.exports = AuthController;
