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
    AnserquestionModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "答疑主键  外键",
      field: "AnserquestionModelId"
    },
    UsersModelId: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "用户主键 外键",
      field: "UsersModelId"
    },
    content: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "评论内容",
      field: "content"
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "评论时间",
      field: "date"
    },
    praise: {
      type: DataTypes.INTEGER(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "评论点赞总量",
      field: "praise"
    }
  };
  const options = {
    tableName: "comments",
    comment: "",
    indexes: []
  };
  const CommentsModel = sequelize.define("comments_model", attributes, options);
  CommentsModel.associate = function(){
    app.model.CommentsModel.belongsTo(app.model.UsersModel);
    app.model.CommentsModel.hasMany(app.model.ReplayModel)
  }
  return CommentsModel;
};