'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TweetId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName : 'Tweets'
          },
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      UserId: {
        type : Sequelize.INTEGER  
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Likes');
  }
};