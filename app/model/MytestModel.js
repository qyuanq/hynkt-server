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
    usersModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "用户id  外键",
      field: "usersModelId"
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "提交时间",
      field: "date"
    },
    classSingleModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "课程id",
      field: "classSingleModelId"
    },
    courceSectionModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "章节Id",
      field: "courceSectionModelId"
    },
    chapterTestModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "习题进度  习题id",
      field: "chapterTestModelId"
    }
  };
  const options = {
    tableName: "mytest",
    comment: "",
    indexes: []
  };
  const MytestModel = sequelize.define("mytest_model", attributes, options);
  return MytestModel;
};