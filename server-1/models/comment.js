'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    TweetId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    reply: {
      type: DataTypes.STRING,
      validate : {
        notEmpty: {
          msg : 'Reply must be filled!'
        }
      }
    },
    
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.Tweet)
    Comment.belongsTo(models.User)

  };
  return Comment;
};