const mongoose = require("mongoose");

const device = require("./devices.model");
const user = require("./users.model");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

db.User = user;
db.Device = device;

module.exports = db;
