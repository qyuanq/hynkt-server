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
      comment: "习题Id 外键",
      field: "ChapterTestModelId"
    },
    UsersModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "用户id",
      field: "UsersModelId"
    },
    VideoGoodModelId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "视频id",
      field: "VideoGoodModelId"
    }
  };
  const options = {
    tableName: "favorites",
    comment: "",
    indexes: []
  };
  const FavoritesModel = sequelize.define("favorites_model", attributes, options);
  FavoritesModel.associate = function(){
    app.model.FavoritesModel.hasMany(app.model.ChapterTestModel);
  }
  return FavoritesModel;
};