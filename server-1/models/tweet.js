'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tweet = sequelize.define('Tweet', {
    tweet: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "tweet must be filled!"
        }
      }
    },
    tags: {
      type: DataTypes.STRING,
    },
    media: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          msg: "Must be an url"
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
    }
  }, {});
  Tweet.associate = function (models) {
    // associations can be defined here
    Tweet.belongsTo(models.User)
    Tweet.hasMany(models.Like)
    Tweet.hasMany(models.Comment)

  };
  return Tweet;
};