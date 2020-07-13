'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    reply: {
      type: DataTypes.STRING,
      validate : {
        notEmpty: {
          msg : 'Reply must be filled!'
        }
      }
    },
    UserId: DataTypes.INTEGER,
    TweetId: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.Tweet)
    Comment.belongsTo(models.User)

  };
  return Comment;
};