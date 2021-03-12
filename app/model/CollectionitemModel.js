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
    ChapterTestModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "习题id 外键",
      field: "ChapterTestModelId"
    },
    FavoritesModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "收藏id 外键",
      field: "FavoritesModelId"
    }
  };
  const options = {
    tableName: "collectionitem",
    comment: "",
    indexes: []
  };
  const CollectionitemModel = sequelize.define("collectionitem_model", attributes, options);
  return CollectionitemModel;
};