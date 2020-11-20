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
    classMealModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "套餐班id",
      field: "classMealModelId"
    },
    classSingleModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "单科班id",
      field: "classSingleModelId"
    }
  };
  const options = {
    tableName: "classitems",
    comment: "",
    indexes: [{
      name: "meal_id",
      unique: false,
      type: "BTREE",
      fields: ["classMealModelId"]
    }, {
      name: "single_id",
      unique: false,
      type: "BTREE",
      fields: ["classSingleModelId"]
    }]
  };
  const ClassitemsModel = sequelize.define("classitems_model", attributes, options);
  return ClassitemsModel;
};