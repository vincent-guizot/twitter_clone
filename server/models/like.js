'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    TweetId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
  }, {});
  Like.associate = function(models) {
    // associations can be defined here
    Like.belongsTo(models.Tweet)
    Like.belongsTo(models.User)
  };
  return Like;
};