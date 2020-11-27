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
    hot: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "是否热门",
      field: "hot"
    }
  };
  const options = {
    tableName: "class_hot",
    comment: "",
    indexes: []
  };
  const ClassHotModel = sequelize.define("class_hot_model", attributes, options);
  return ClassHotModel;
};