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
    UsersModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "用户id",
      field: "UsersModelId"
    },
    ChapterTestModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "习题Id",
      field: "ChapterTestModelId"
    }
  };
  const options = {
    tableName: "wrong_topic",
    comment: "",
    indexes: []
  };
  const WrongTopicModel = sequelize.define("wrong_topic_model", attributes, options);
  return WrongTopicModel;
};