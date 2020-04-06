'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Cars', [
      {
        userId: 1,
        plate: 'ABC-123',
        brand: 'Chevrolet',
        color: 'Amarillo',
        model: 'Cavalier',
        position: JSON.stringify({
          lat: 20.6738204,
          lng: -103.3571491
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        plate: 'DEF-456',
        brand: 'Nissan',
        color: 'Azul',
        model: 'Versa',
        position: JSON.stringify({
          lat: 20.678905,
          lng: -103.3788547
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        plate: 'XYZ-123',
        brand: 'Mazda',
        color: 'Rojo',
        model: 'Mazda 3',
        position: JSON.stringify({
          lat: 20.678042,
          lng: -103.3749497
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        plate: 'GTP-867',
        brand: 'Ford',
        color: 'Blanco',
        model: 'Fist',
        position: JSON.stringify({
          lat: 20.680469,
          lng: -103.3720117
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Cars', null, {});
  }
};
