'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('departments', [
      {
        name: 'HR',
        deletedAt: null,
      },
      {
        name: 'Finance',
        deletedAt: null,
      },
      {
        name: 'Marketing',
        deletedAt: null,
      },
      {
        name: 'IT',
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('departments', null, {});
  },
};
