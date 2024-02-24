const { DataTypes } = require('sequelize');

const User = (sequelize) => {
  return sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    registrationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    lastLoginDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

module.exports = User;
