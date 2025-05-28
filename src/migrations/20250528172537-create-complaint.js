'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('complaints', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.DataTypes.ENUM('open', 'in_progress', 'resolved'),
        allowNull: false,
        defaultValue: 'open',
      },
      category: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      image_url: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      user_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('complaints');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_complaints_status";');
    console.log('Complaints table and enum type dropped successfully.');
  },
};
