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
      comment: "专业代码",
      field: "id"
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "专业名称",
      field: "name"
    },
    show: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "是否显示",
      field: "show"
    },
    categoryId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "种类id",
      field: "categoryId"
    }
  };
  const options = {
    tableName: "speclallty",
    comment: "",
    indexes: [{
      name: "categoryId",
      unique: false,
      type: "BTREE",
      fields: ["categoryId"]
    }]
  };
  const SpeclalltyModel = sequelize.define("speclallty_model", attributes, options);
  return SpeclalltyModel;
};