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
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "单科班名字",
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
      type: DataTypes.INTEGER(16),
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
    label: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "标签",
      field: "label"
    },
    classgroup_id: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "课程分类 外键",
      field: "classgroup_id"
    },
    classCode: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "课程代码",
      field: "classCode",
      unique: "classCode"
    },
    classHotModelId: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "是否热门 外键",
      field: "classHotModelId"
    },
    hotSort: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "热门排序",
      field: "hotSort"
    }
  };
  const options = {
    tableName: "class_single",
    comment: "",
    indexes: []
  };
  const ClassSingleModel = sequelize.define("class_single_model", attributes, options);
  ClassSingleModel.associate = function(){
    app.model.ClassSingleModel.hasMany(app.model.AnserquestionModel);
    app.model.ClassSingleModel.hasMany(app.model.CourceSectionModel);
    app.model.ClassSingleModel.belongsToMany(app.model.MycourceModel,{through:app.model.CourceitemsModel})
    app.model.ClassSingleModel.belongsToMany(app.model.GoodCartModel,{through:app.model.CartitemModel})
    app.model.ClassSingleModel.hasMany(app.model.CartitemModel);
  }
  return ClassSingleModel;
};