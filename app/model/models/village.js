'use strict';

module.exports = app => {
  const DataTypes = app.Sequelize;
  const sequelize = app.model;
  const attributes = {
    _id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "_id"
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "name"
    },
    village_id: {
      type: DataTypes.STRING(12),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "village_id"
    },
    town_id: {
      type: DataTypes.STRING(12),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "town_id"
    }
  };
  const options = {
    tableName: "village",
    comment: "",
    indexes: []
  };
  const VillageModel = sequelize.define("village_model", attributes, options);
  return VillageModel;
};