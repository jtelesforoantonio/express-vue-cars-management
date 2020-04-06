'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE
  }, {});
  User.associate = function (models) {
    User.hasMany(models.Car, {as: 'cars'});
  };

  return User;
};
