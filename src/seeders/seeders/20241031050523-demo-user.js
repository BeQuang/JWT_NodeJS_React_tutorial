"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "User",
      [
        {
          email: "mailfake1@gmail.com",
          password: "fake1",
          username: "Fake1",
        },
        {
          email: "mailfake2@gmail.com",
          password: "fake2",
          username: "Fake2",
        },
        {
          email: "mailfake3@gmail.com",
          password: "fake3",
          username: "Fake3",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
