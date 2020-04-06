const models = require('../models');
const carService = require('../services/car');
const {Op} = require('sequelize');

const CarController = {
  async index(req, res) {
    try {
      const adicionalWheres = {};
      if (!req.user.isAdmin) {
        adicionalWheres.userId = req.user.id;
      }
      const cars = await models.Car.findAll({
        attributes: ['id', 'userId', 'plate', 'brand', 'color', 'model', 'position', 'createdAt', 'updatedAt'],
        where: {
          deletedAt: null,
          ...adicionalWheres
        },
        order: [
          ['createdAt', 'DESC']
        ]
      });

      res.status(200).json(cars);
    } catch (e) {
      res.status(500).json({errors: ['Ocurrió un error inesperado, inténtalo de nuevo']});
    }
  },
  async show(req, res) {
    try {
      const car = await models.Car.findOne({
        attributes: ['id', 'userId', 'plate', 'brand', 'color', 'model', 'position', 'createdAt', 'updatedAt'],
        where: {
          id: req.params.id,
          deletedAt: null,
        }
      });
      if (car) {
        if (!req.user.isAdmin && car.userId !== req.user.id) {
          res.status(403).json({errors: ['No tienes permisos necesarios']});
        } else {
          res.status(200).json(car);
        }
      } else {
        res.status(404).json({errors: ['El automóvil no existe']});
      }
    } catch (e) {
      res.status(500).json({errors: ['Ocurrió un error inesperado, inténtalo de nuevo']});
    }
  },
  async store(req, res) {
    try {
      const response = carService.validateData(req.body);
      if (response.success) {
        const data = req.body;
        data.userId = req.user.id;
        data.position.lat = parseFloat(data.position.lat);
        data.position.lng = parseFloat(data.position.lng);
        const car = await models.Car.create(data);
        res.status(201).json(car);
      } else {
        res.status(422).json({errors: response.errors});
      }
    } catch (e) {
      res.status(500).json({errors: ['Ocurrió un error inesperado, inténtalo de nuevo']});
    }
  },
  async update(req, res) {
    try {
      const car = await models.Car.findOne({
        where: {
          id: req.params.id,
          deletedAt: null
        }
      });
      if (car) {
        if (!req.user.isAdmin && car.userId !== req.user.id) {
          res.status(403).json({errors: ['No tienes permisos necesarios']});
        } else {
          const response = carService.validateData(req.body);
          if (response.success) {
            const data = req.body;
            data.position.lat = parseFloat(data.position.lat);
            data.position.lng = parseFloat(data.position.lng);
            await car.update(data);
            res.status(200).json([]);
          } else {
            res.status(422).json({errors: response.errors});
          }
        }
      } else {
        res.status(404).json({errors: ['El automóvil no existe']});
      }
    } catch (e) {
      res.status(500).json({errors: ['Ocurrió un error inesperado, inténtalo de nuevo']});
    }

  },
  async delete(req, res) {
    try {
      const car = await models.Car.findOne({
        where: {
          id: req.params.id,
          deletedAt: null
        }
      });
      if (car) {
        if (!req.user.isAdmin && car.userId !== req.user.id) {
          res.status(403).json({errors: ['No tienes permisos necesarios']});
        } else {
          await car.update({deletedAt: new Date()});
          res.status(200).json([]);
        }
      } else {
        res.status(404).json({errors: ['El automóvil no existe']});
      }
    } catch (e) {
      res.status(500).json({errors: ['Ocurrió un error inesperado, inténtalo de nuevo']});
    }
  },
  async setPosition(req, res) {
    try {
      const car = await models.Car.findOne({
        where: {
          id: req.params.id,
          deletedAt: null
        }
      });
      if (car) {
        if (!req.user.isAdmin && car.userId !== req.user.id) {
          res.status(403).json({errors: ['No tienes permisos necesarios']});
        } else {
          const response = carService.validatePosition(req.body);
          if (response.success) {
            const position = {
              lat: parseFloat(req.body.position.lat),
              lng: parseFloat(req.body.position.lng),
            };
            await car.update({position: position});
            res.status(200).json([]);
          } else {
            res.status(422).json({errors: response.errors});
          }
        }
      } else {
        res.status(404).json({errors: ['El automóvil no existe']});
      }
    } catch (e) {
      res.status(500).json({errors: ['Ocurrió un error inesperado, inténtalo de nuevo']});
    }
  }
};

module.exports = CarController;
