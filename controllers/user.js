const express = require("express");
const router = express.Router();
const sequelize = require("../db");
const User = sequelize.import("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", (req, res) => {
  const { email, password } = req.body.user;

  User.create({
    email,
    passwordhash: bcrypt.hashSync(password, 10)
  }).then(
    user => {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24
      });

      res.json({
        token
      });
    },
    err =>
      res
        .status(400)
        .json({ msg: "This E-mail is associated with another user." })
  );
});

router.post(
  "/login",

  (req, res) => {
    const { email, password } = req.body.user;

    User.findOne({ where: { email } }).then(user => {
      if (!user) {
        return res
          .status(400)
          .json({ msg: "This E-mail is not associated with a user." });
      } else {
        bcrypt.compare(password, user.passwordhash, (err, matches) => {
          if (!matches) {
            return res
              .status(400)
              .json({ msg: "The password you have entered is invalid" });
          } else {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
              expiresIn: 60 * 60 * 24
            });

            res.json({
              token
            });
          }
        });
      }
    });
  }
);

module.exports = router;
