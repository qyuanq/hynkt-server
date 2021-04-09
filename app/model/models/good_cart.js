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
    userModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "用户id ",
      field: "userModelId",
      unique: "userModelId"
    }
  };
  const options = {
    tableName: "good_cart",
    comment: "",
    indexes: []
  };
  const GoodCartModel = sequelize.define("good_cart_model", attributes, options);
  return GoodCartModel;
};