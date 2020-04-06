'use strict';
module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define('Car', {
    userId: DataTypes.INTEGER,
    plate: DataTypes.STRING,
    brand: DataTypes.STRING,
    color: DataTypes.STRING,
    model: DataTypes.STRING,
    position: DataTypes.JSON,
    deletedAt: DataTypes.DATE
  }, {});
  Car.associate = function (models) {
    Car.belongsTo(models.User, {foreignKey: 'userId', as: 'user'})
  };

  return Car;
};
