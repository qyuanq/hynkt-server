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
    usersModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "用户id 外键",
      field: "usersModelId"
    },
    simulationTestModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "试卷id 外键",
      field: "simulationTestModelId",
      unique: "simulationTestModelId"
    },
    count: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: "考试次数",
      field: "count"
    },
    record: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "试题记录",
      field: "record"
    },
    time: {
      type: DataTypes.INTEGER(32),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "剩余时间",
      field: "time"
    },
    score: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "最后一次分数",
      field: "score"
    },
    classSingleModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "课程id  外键",
      field: "classSingleModelId"
    }
  };
  const options = {
    tableName: "mysimulation",
    comment: "",
    indexes: []
  };
  const MysimulationModel = sequelize.define("mysimulation_model", attributes, options);
  MysimulationModel.associate = function(){
    app.model.MysimulationModel.belongsTo(app.model.SimulationTestModel);
  }
  return MysimulationModel;
};