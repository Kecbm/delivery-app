'use strict';

module.exports = (sequelize, DataTypes) => {
  const SaleTable = sequelize.define(
    'Sale',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      sellerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        reference: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      totalPrice: {
        allowNull: false,
        type: DataTypes.DECIMAL(9, 2)
      },
      deliveryAddress: {
        allowNull: false,
        type: DataTypes.STRING
      },
      deliveryNumber: {
        allowNull: false,
        type: DataTypes.STRING
      },
      saleDate: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'Pendente'
      }
    },
    {
      timestamps: false,
      tableName: 'sales',
      underscored: true,
    }
  );
  SaleTable.associate = (models) => {
    SaleTable.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
    SaleTable.belongsTo(models.User, { as: 'seller', foreignKey: 'seller_id' });
    // SaleTable.hasMany(models.SaleProduct, { foreignKey: 'saleId', as: 'products' });
  };
  return SaleTable;
};
