'use strict';
module.exports = (sequelize, DataTypes) => {
  const SaleProductTable = sequelize.define(
    'SaleProduct',
    {
      saleId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'Sales',
          key: 'id'
        }
      },
      productId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'Products',
          key: 'id'
        }
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
      tableName: 'sales_products',
      underscored: true,
    }
  );

  SaleProductTable.associate = (models) => {
    models.Product.belongsToMany(models.Sale,
      {
        // as:'sales',
        foreignKey: 'productId',
        otherKey: 'saleId',
        through: SaleProductTable
      });
    models.Sale.belongsToMany(models.Product,
      {
        as: 'products',
        foreignKey: 'saleId',
        otherKey: 'productId',
        through: SaleProductTable
      });
  };

  return SaleProductTable;
}
