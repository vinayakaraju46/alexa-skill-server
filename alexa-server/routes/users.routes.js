const router = require("express").Router();

const db = require("../models");
const User = db.User;

router.post("/create", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      res.send({
        success: false,
        message: "User already exists",
      });
    } else {
      const newUser = new User({
        email: req.body.email,
        name: req.body.name,
      });

      newUser
        .save()
        .then((newUserInfo) => {
          if (newUserInfo) {
            res.send({
              success: true,
              message: "User created successfully",
              data: newUserInfo,
            });
          } else {
            res.send({
              success: false,
              message: "Failed to create user",
            });
          }
        })
        .catch((err) => {
          res.send({
            success: false,
            message: err.message,
          });
        });
    }
  });
});

router.get("/:email?", (req, res) => {
  User.findOne({ email: req.params.email })
    .populate("devices")
    .then((user) => {
      if (user) {
        res.send({
          success: true,
          message: "User found",
          data: user,
        });
      } else {
        res.send({
          success: false,
          message: "User not found",
        });
      }
    });
});

module.exports = router;
