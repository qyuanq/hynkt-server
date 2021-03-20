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
    classSingleModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "班型",
      field: "classSingleModelId"
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "title"
    },
    isOpen: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "0/1  是否开放",
      field: "isOpen"
    },
    test_time: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "考试开放时间",
      field: "test_time"
    }
  };
  const options = {
    tableName: "simulation_test",
    comment: "",
    indexes: []
  };
  const SimulationTestModel = sequelize.define("simulation_test_model", attributes, options);
  SimulationTestModel.associate = function(){
    app.model.SimulationTestModel.hasMany(app.model.TestQuestionModel);
    app.model.SimulationTestModel.hasMany(app.model.MysimulationModel);
  }
  return SimulationTestModel;
};