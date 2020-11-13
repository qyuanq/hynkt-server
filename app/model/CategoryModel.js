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
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "种类名称",
      field: "name"
    }
  };
  const options = {
    tableName: "category",
    comment: "",
    indexes: []
  };
  const CategoryModel = sequelize.define("category_model", attributes, options);
  return CategoryModel;
};