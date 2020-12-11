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
      comment: "单科课程id  外键",
      field: "ClassSingleModelId"
    },
    ClassMealModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "套餐课程id  外键",
      field: "ClassMealModelId"
    },
    OrdersModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "订单id  外键",
      field: "OrdersModelId"
    }
  };
  const options = {
    tableName: "orderitems",
    comment: "",
    indexes: []
  };
  const OrderitemsModel = sequelize.define("orderitems_model", attributes, options);
  return OrderitemsModel;
};