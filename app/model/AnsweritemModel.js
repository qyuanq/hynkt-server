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
    myAnswer: {
      type: DataTypes.STRING(8),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "我的答案",
      field: "myAnswer"
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
    UsersModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "用户id 外键",
      field: "UsersModelId"
    }
  };
  const options = {
    tableName: "answeritem",
    comment: "",
    indexes: []
  };
  const AnsweritemModel = sequelize.define("answeritem_model", attributes, options);
  return AnsweritemModel;
};