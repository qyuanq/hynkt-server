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
    content: {
      type: DataTypes.STRING(1024),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "评价内容",
      field: "content"
    },
    star: {
      type: DataTypes.INTEGER(8),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "星级",
      field: "star"
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "评论时间",
      field: "date"
    },
    UsersModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "用户id 外键",
      field: "UsersModelId"
    },
    ClassSingleModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "单科班id 外键",
      field: "ClassSingleModelId"
    }
  };
  const options = {
    tableName: "evaluation",
    comment: "",
    indexes: []
  };
  const EvaluationModel = sequelize.define("evaluation_model", attributes, options);
  return EvaluationModel;
};