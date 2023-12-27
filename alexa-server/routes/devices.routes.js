const router = require("express").Router();
const db = require("../models");
const User = db.User;
const Device = db.Device;

router.post("/add", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      const newDevice = new Device({
        deviceName: req.body.deviceName,
        userId: user._id,
      });

      newDevice.save().then((newDeviceInfo) => {
        if (newDeviceInfo) {
          user.devices.push(newDeviceInfo._id);

          user.save().then((updatedUserInfo) => {
            if (updatedUserInfo) {
              res.send({
                success: true,
                message: "Device added successfully",
                data: newDeviceInfo,
              });
            } else {
              res.send({
                success: false,
                message: "Failed to add device",
              });
            }
          });
        }
      });
    } else {
      res.send({
        success: false,
        message: "User not found",
      });
    }
  });
});

router.post("/change-state", (req, res) => {
  Device.findOne({ _id: req.body.deviceID }).then((device) => {
    if (device) {
      device.deviceState = req.body.deviceState;

      device.save().then((updatedDevice) => {
        if (updatedDevice) {
          res.send({
            success: true,
            message: "Device state updated successfully",
            data: updatedDevice,
          });
        } else {
          res.send({
            success: false,
            message: "Failed to update device state",
          });
        }
      });
    }
  });
});

module.exports = router;
