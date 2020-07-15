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
      type: DataTypes.ARRAY(DataTypes.STRING),
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
  }, {
    hooks: {
      beforeCreate(data) {
        data.tags = []
        data.tweet.split(' ').forEach(el=>{
          if(el[0]==="#"){
            data.tags.push(el.split("#")[1])
          }
        })
        console.log(data.tags)
      },
      beforeUpdate(data) {
        data.tags = []
        data.tweet.split(' ').forEach(el=>{
          if(el[0]==="#"){
            data.tags.push(el.split("#")[1])
          }
        })
        console.log(data.tags)
      }
    }
  });
  Tweet.associate = function (models) {
    // associations can be defined here
    Tweet.belongsTo(models.User)
    Tweet.hasMany(models.Like)
    Tweet.hasMany(models.Comment)

  };
  return Tweet;
};