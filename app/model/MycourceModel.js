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
    usersModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "用户主键 外键",
      field: "usersModelId"
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "课程加入时间",
      field: "date"
    },
    sec_selected: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "章节索引",
      field: "sec_selected"
    },
    vid_selected: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "视频索引",
      field: "vid_selected"
    },
    vid_title: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "当前标题",
      field: "vid_title"
    },
    currentTime: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "当前播放位置",
      field: "currentTime"
    },
    proarr: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "已播放进度数组",
      field: "proarr"
    },
    currentCource: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "当前课程位置",
      field: "currentCource"
    },
    classSingleModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "课程id",
      field: "classSingleModelId"
    }
  };
  const options = {
    tableName: "mycource",
    comment: "",
    indexes: []
  };
  const MycourceModel = sequelize.define("mycource_model", attributes, options);
  MycourceModel.associate = function(){
    app.model.MycourceModel.belongsToMany(app.model.ClassSingleModel,{through:app.model.CourceitemsModel})
  }
  return MycourceModel;
};