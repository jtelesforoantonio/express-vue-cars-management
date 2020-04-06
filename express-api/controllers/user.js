const bcrypt = require('bcrypt');
const models = require('../models');
const userService = require('../services/user');
const {Op} = require('sequelize');

const UserController = {
  async index(req, res) {
    try {
      const users = await models.User.findAll({
        attributes: ['id', 'name', 'email', 'isAdmin', 'createdAt', 'updatedAt'],
        where: {
          deletedAt: null,
          id: {
            [Op.ne]: req.user.id
          },
        },
        order: [
          ['createdAt', 'DESC']
        ]
      });

      res.status(200).json(users);
    } catch (e) {
      res.status(500).json({errors: ['Ocurrió un error inesperado, inténtalo de nuevo']});
    }
  },
  async show(req, res) {
    try {
      if (req.user.isAdmin || req.user.id == req.params.id) {
        const user = await models.User.findOne({
          attributes: ['id', 'name', 'email', 'isAdmin', 'createdAt', 'updatedAt'],
          where: {
            id: req.params.id,
            deletedAt: null
          }
        });
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({errors: ['El usuario no existe']});
        }
      } else {
        res.status(403).json({errors: ['No tienes permisos necesarios']});
      }
    } catch (e) {
      res.status(500).json({errors: ['Ocurrió un error inesperado, inténtalo de nuevo']});
    }
  },
  async store(req, res) {
    try {
      const response = await userService.validateStoreData(req.body);
      if (response.success) {
        const data = req.body;
        data.password = bcrypt.hashSync(data.password, 10);
        const userCreated = await models.User.create(data);
        delete data.password;
        data.id = userCreated.id;
        data.createdAt = userCreated.createdAt;
        data.updatedAt = userCreated.updatedAt;
        res.status(201).json(data);
      } else {
        res.status(422).json({errors: response.errors});
      }
    } catch (e) {
      res.status(500).json({errors: ['Ocurrió un error inesperado, inténtalo de nuevo']});
    }
  },
  async update(req, res) {
    try {
      if (req.user.isAdmin || req.user.id == req.params.id) {
        const user = await models.User.findOne({
          where: {
            id: req.params.id,
            deletedAt: null
          }
        });
        if (user) {
          const response = await userService.validateUpdateData(req.params.id, req.body);
          if (response.success) {
            const data = req.body;
            if (data.hasOwnProperty('password') && data.password) {
              data.password = bcrypt.hashSync(data.password, 10);
            } else {
              delete data.password;
            }
            await user.update(data);
            res.status(200).json([]);
          } else {
            res.status(422).json({errors: response.errors});
          }
        } else {
          res.status(404).json({errors: ['El usuario no existe']});
        }
      } else {
        res.status(403).json({errors: ['No tienes permisos necesarios']});
      }
    } catch (e) {
      res.status(500).json({errors: ['Ocurrió un error inesperado, inténtalo de nuevo']});
    }

  },
  async delete(req, res) {
    try {
      const user = await models.User.findOne({
        where: {
          id: req.params.id,
          deletedAt: null
        }
      });
      if (user) {
        let label = `${user.email}_${new Date().toLocaleString()}`;
        await user.update({email: label, deletedAt: new Date()});
        res.status(200).json([]);
      } else {
        res.status(404).json({errors: ['El usuario no existe']});
      }
    } catch (e) {
      res.status(500).json({errors: ['Ocurrió un error inesperado, inténtalo de nuevo']});
    }
  },
};

module.exports = UserController;
