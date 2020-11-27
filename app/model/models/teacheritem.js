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
    ClassSingleModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "课程id",
      field: "ClassSingleModelId"
    },
    TeacherModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "老师id",
      field: "TeacherModelId"
    }
  };
  const options = {
    tableName: "teacheritem",
    comment: "",
    indexes: []
  };
  const TeacheritemModel = sequelize.define("teacheritem_model", attributes, options);
  return TeacheritemModel;
};