const Favs = require("./Favs");
const User = require("./User");

User.hasMany(Favs);
Favs.belongsTo(User)


module.exports = { Favs, User };