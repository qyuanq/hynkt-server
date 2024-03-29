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
      comment: "视频路径",
      field: "name"
    },
    path: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "视频地址",
      field: "path"
    },
    extent: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "权限",
      field: "extent"
    },
    section: {
      type: DataTypes.STRING(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "章节名称",
      field: "section"
    },
    single_id: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "单科班外键",
      field: "single_id"
    },
    courceSectionModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "课程章节id",
      field: "courceSectionModelId"
    }
  };
  const options = {
    tableName: "video_good",
    comment: "",
    indexes: [{
      name: "single_id",
      unique: false,
      type: "BTREE",
      fields: ["single_id"]
    }]
  };
  const VideoGoodModel = sequelize.define("video_good_model", attributes, options);
  return VideoGoodModel;
};