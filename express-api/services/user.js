const models = require('../models');
const {Op} = require('sequelize');

exports.validateStoreData = async (data) => {
  const response = {
    success: true
  };
  const errors = [];

  if (!data.hasOwnProperty('name') || !data.name) {
    response.success = false;
    errors.push('El campo nombre es requerido');
  }
  if (!data.hasOwnProperty('email') || !data.email) {
    response.success = false;
    errors.push('El campo correo es requerido');
  }
  if (!data.hasOwnProperty('password') || !data.password) {
    response.success = false;
    errors.push('El campo contraseña es requerido');
  }
  if (!data.hasOwnProperty('isAdmin') || typeof data.isAdmin !== 'boolean') {
    response.success = false;
    errors.push('El campo administrador es requerido');
  }

  if (response.success) {
    const existsUser = await models.User.findOne({
      where: {
        email: data.email,
        deletedAt: null
      }
    });

    if (existsUser) {
      response.success = false;
      errors.push('El campo correo ya existe');
    }
  }

  response.errors = errors;

  return response;
};

exports.validateUpdateData = async (id, data) => {
  const response = {
    success: true
  };
  const errors = [];

  if (!data.hasOwnProperty('name') || !data.name) {
    response.success = false;
    errors.push('El campo nombre es requerido');
  }
  if (!data.hasOwnProperty('email') || !data.email) {
    response.success = false;
    errors.push('El campo correo es requerido');
  }
  if (!data.hasOwnProperty('isAdmin') || typeof data.isAdmin !== 'boolean') {
    response.success = false;
    errors.push('El campo administrador es requerido');
  }

  if (response.success) {
    const existsUser = await models.User.findOne({
      where: {
        id: {
          [Op.ne]: id
        },
        email: data.email,
        deletedAt: null
      }
    });

    if (existsUser) {
      response.success = false;
      errors.push('El campo correo ya existe');
    }
  }

  response.errors = errors;

  return response;
};
