const bcrypt = require('bcrypt');
const jwtService = require('../services/jwt');

exports.validateData = (data) => {
  const response = {
    success: true
  };
  const errors = [];

  if (!data.hasOwnProperty('email') || !data.email) {
    response.success = false;
    errors.push('El campo correo es requerido');
  }
  if (!data.hasOwnProperty('password') || !data.password) {
    response.success = false;
    errors.push('El campo contraseña es requerido');
  }
  response.errors = errors;

  return response;
};

exports.login = async (user, req) => {
  const response = {};

  if (user) {
    let match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      const token = jwtService.generateToken(user);
      response.status = 200;
      response.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: token
      };
    } else {
      response.status = 422;
      response.errors = ['La contraseña es incorrecta'];
    }
  } else {
    response.status = 404;
    response.errors = ['Regístrate para poder ingresar'];
  }

  return response;
};
