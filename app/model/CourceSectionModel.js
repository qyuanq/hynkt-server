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
    name: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "name"
    },
    classSingleModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "单程课程id  外键",
      field: "classSingleModelId"
    }
  };
  const options = {
    tableName: "cource_section",
    comment: "",
    indexes: []
  };
  const CourceSectionModel = sequelize.define("cource_section_model", attributes, options);
  CourceSectionModel.associate = function(){
    app.model.CourceSectionModel.belongsTo(app.model.ClassSingleModel);
    app.model.CourceSectionModel.hasMany(app.model.ChapterTestModel);
  }
  return CourceSectionModel;
};