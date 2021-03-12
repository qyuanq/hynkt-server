'use strict';

module.exports = app => {
  const DataTypes = app.Sequelize;
  const sequelize = app.model;
  const attributes = {
    id: {
      type: DataTypes.INTEGER(16),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id"
    },
    UsersModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "用户id",
      field: "UsersModelId"
    }
  };
  const options = {
    tableName: "favorites",
    comment: "",
    indexes: []
  };
  const FavoritesModel = sequelize.define("favorites_model", attributes, options);
  return FavoritesModel;
};