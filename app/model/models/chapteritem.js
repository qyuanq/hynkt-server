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
      comment: "用户id 外键",
      field: "usersModelId"
    },
    ChapterTestModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "习题id 外键",
      field: "ChapterTestModelId"
    },
    progress: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "进度",
      field: "progress"
    }
  };
  const options = {
    tableName: "chapteritem",
    comment: "",
    indexes: []
  };
  const ChapteritemModel = sequelize.define("chapteritem_model", attributes, options);
  return ChapteritemModel;
};