'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('facility_bookings', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      facility_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'facilities',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      user_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      schedule_start: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      schedule_end: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      approved: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deleted_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('facility_bookings');
  },
};
