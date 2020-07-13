'use strict';
const bcrypt = require('bcrypt')
const saltRounds = 2

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Name must be filled!"
        }
      }
    },
    
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Email must be filled!"
        },
        isEmail: {
          msg: "Must be email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Pwd must be filled!"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Image must be filled!"
        },
        isUrl: {
          msg: "Image must be URL!"
        }
      }
    },
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = bcrypt.hashSync(user.password, saltRounds)
      }
    }
  });
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Tweet)
    User.hasMany(models.Like)
    User.hasMany(models.Comment)
  };
  return User;
};