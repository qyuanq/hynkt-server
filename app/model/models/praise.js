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
    AnserquestionModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "答疑id 外键",
      field: "AnserquestionModelId"
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
    tableName: "praise",
    comment: "",
    indexes: []
  };
  const PraiseModel = sequelize.define("praise_model", attributes, options);
  return PraiseModel;
};