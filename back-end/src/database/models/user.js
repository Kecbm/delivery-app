'use strict';

module.exports = (sequelize, DataTypes) => {
  const UserTable = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      role: {
        type: DataTypes.STRING,
        defaultValue: 'customer',
      }
    },
    {
      timestamps: false,
      tableName: 'users',
      underscored: true,
    }
  );
  UserTable.associate = (models) => {
    UserTable.hasMany(models.Sale, { as: 'user_id', foreignKey: 'id' });
    UserTable.hasMany(models.Sale, { as: 'seller_id', foreignKey: 'id' });
  };
  return UserTable;
};
