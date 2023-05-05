'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductTable = sequelize.define(
    'Product',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      price: {
        allowNull: false,
        type: DataTypes.DECIMAL(4, 2)
      },
      urlImage: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: ''
      },
    },
    {
      timestamps: false,
      tableName: 'products',
      underscored: true,
    }
  );
  ProductTable.associate = (models) => {
    ProductTable.hasMany(models.SaleProduct, { as: 'products', foreignKey: 'product_id' });
  };
  return ProductTable;
};
