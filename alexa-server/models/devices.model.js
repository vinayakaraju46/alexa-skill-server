const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  deviceName: String,
  deviceState: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const deviceModel = mongoose.model("Device", deviceSchema);

module.exports = deviceModel;
