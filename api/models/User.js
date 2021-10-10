const S = require("sequelize");
const db = require("../config/database");

class User extends S.Model {}

User.init(
  {
    full_name: {
      type: S.STRING,
      allowNull: false,
    },
    email: {
      type: S.STRING,
      allowNull: false,
      unique: true,
    },
    password: { 
      type: S.STRING
    },
    token: {
      type: S.STRING
    }

  },

  { sequelize: db, modelName: "user" }
);

module.exports = User;