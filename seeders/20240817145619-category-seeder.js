'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('categories', [
    {
      name : 'Action'
    },
    {
      name : 'Happy'
    },
    {
      name : 'Sad'
    },
    {
      name : 'Nodejs'
    },
    {
      name : 'Laravel'
    },
    ]);
  },

  async down (queryInterface, Sequelize) {
     return queryInterface.bulkDelete('categories',{} , null);
  }
};
