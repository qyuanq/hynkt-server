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
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "题目",
      field: "title"
    },
    optionA: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "选项A",
      field: "optionA"
    },
    optionB: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "选项B",
      field: "optionB"
    },
    optionC: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "选项C",
      field: "optionC"
    },
    optionD: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "选项D",
      field: "optionD"
    },
    answer: {
      type: DataTypes.STRING(512),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "答案",
      field: "answer"
    },
    score: {
      type: DataTypes.INTEGER(16),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "分值",
      field: "score"
    },
    simulationTestModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "章节id",
      field: "simulationTestModelId"
    },
    type: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "题型 1单选 2多选 3判断 4填空 5问答",
      field: "type"
    }
  };
  const options = {
    tableName: "test_question",
    comment: "",
    indexes: []
  };
  const TestQuestionModel = sequelize.define("test_question_model", attributes, options);
  TestQuestionModel.associate = function(){
    app.model.TestQuestionModel.belongsTo(app.model.SimulationTestModel);
  }
  return TestQuestionModel;
};