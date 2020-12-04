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
      comment: "课程类别名  如教师资格证",
      field: "name"
    },
    speclalltyModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "speclalltyModelId"
    }
  };
  const options = {
    tableName: "classgory",
    comment: "",
    indexes: [{
      name: "speclalltyId",
      unique: false,
      type: "BTREE",
      fields: ["speclalltyModelId"]
    }]
  };
  const ClassgoryModel = sequelize.define("classgory_model", attributes, options);
  return ClassgoryModel;
};