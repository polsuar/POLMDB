const S = require("sequelize");
const db = require("../config/database");
const User = require("./User");

class Favs extends S.Model {}

Favs.init(
  {
    movieId: {
      type: S.STRING,
      allowNull: false,
      unique: true,
    },

    userId: {
      type: S.INTEGER,
      references: {
      model: User,
      key: 'id'
    }
    },
  },

  { sequelize: db, modelName: "favs" }
);

module.exports = Favs;