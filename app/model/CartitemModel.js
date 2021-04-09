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
    goodCartModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "购物车id  外键",
      field: "goodCartModelId"
    },
    classSingleModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "单科课程id    外键",
      field: "classSingleModelId"
    },
    classMealModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "套餐课程id    外键",
      field: "classMealModelId"
    },
    count: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "数量",
      field: "count"
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "日期",
      field: "date"
    }
  };
  const options = {
    tableName: "cartitem",
    comment: "",
    indexes: []
  };
  const CartitemModel = sequelize.define("cartitem_model", attributes, options);
  CartitemModel.associate = function(){
    app.model.CartitemModel.belongsTo(app.model.GoodCartModel)
    app.model.CartitemModel.belongsTo(app.model.ClassMealModel)
    app.model.CartitemModel.belongsTo(app.model.ClassSingleModel)
  }
  return CartitemModel;
};