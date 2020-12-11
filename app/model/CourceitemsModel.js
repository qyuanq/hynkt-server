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
    mycourceModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "我的课程主键  ",
      field: "mycourceModelId"
    },
    classSingleModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "单科班主键",
      field: "classSingleModelId"
    }
  };
  const options = {
    tableName: "courceitems",
    comment: "",
    indexes: []
  };
  const CourceitemsModel = sequelize.define("courceitems_model", attributes, options);
  return CourceitemsModel;
};