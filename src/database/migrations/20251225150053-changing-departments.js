'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('departments', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('now'),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('departments', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: null, // Reset the default value if rolling back
    });
  },
};
