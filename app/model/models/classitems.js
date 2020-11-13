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
      autoIncrement: false,
      comment: null,
      field: "id"
    },
    meal_id: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "套餐班id",
      field: "meal_id"
    },
    single_id: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "单科班id",
      field: "single_id"
    }
  };
  const options = {
    tableName: "classitems",
    comment: "",
    indexes: [{
      name: "meal_id",
      unique: false,
      type: "BTREE",
      fields: ["meal_id"]
    }, {
      name: "single_id",
      unique: false,
      type: "BTREE",
      fields: ["single_id"]
    }]
  };
  const ClassitemsModel = sequelize.define("classitems_model", attributes, options);
  return ClassitemsModel;
};