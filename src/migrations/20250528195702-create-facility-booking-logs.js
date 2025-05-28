'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('booking_logs', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      booking_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'facility_bookings',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      status: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      changed_by_user_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      changed_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('booking_logs');
  },
};
