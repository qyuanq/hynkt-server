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
    mytestModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "用户练习进度  外键",
      field: "mytestModelId",
      unique: "mytestModeld"
    },
    record: {
      type: DataTypes.STRING(512),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "习题记录json串",
      field: "record"
    }
  };
  const options = {
    tableName: "test_record",
    comment: "",
    indexes: []
  };
  const TestRecordModel = sequelize.define("test_record_model", attributes, options);
  return TestRecordModel;
};