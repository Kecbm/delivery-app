'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sales', [
      {
        user_id: 2,
        seller_id: 2,
        total_price: 15.00,
        delivery_address: 'lala',
        delivery_number: '707',
        sale_date: new Date(),
        status: 'Pendente'
      },
      {
        user_id: 2,
        seller_id: 2,
        total_price: 15.00,
        delivery_address: 'lalaland',
        delivery_number: '709',
        sale_date: new Date(),
        status: 'Pendente'
      }
    ], { timestamps: false });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sales', null, {});
  }
};
