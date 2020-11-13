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
      comment: "套餐班名称",
      field: "name"
    },
    retail_price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "原价",
      field: "retail_price"
    },
    disc_price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "折扣价",
      field: "disc_price"
    },
    validity: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "有效期",
      field: "validity"
    },
    head_picture: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "首页图",
      field: "head_picture"
    },
    detail_picture: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "详情图",
      field: "detail_picture"
    },
    ground: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "是否上架",
      field: "ground"
    },
    hot: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "是否热门",
      field: "hot"
    },
    classgroup_id: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "课程分类外键",
      field: "classgroup_id"
    }
  };
  const options = {
    tableName: "class_meal",
    comment: "",
    indexes: [{
      name: "classgroup_id",
      unique: false,
      type: "BTREE",
      fields: ["classgroup_id"]
    }]
  };
  const ClassMealModel = sequelize.define("class_meal_model", attributes, options);
  return ClassMealModel;
};