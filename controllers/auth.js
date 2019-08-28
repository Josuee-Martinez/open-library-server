const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sequelize = require("../db");

const User = sequelize.import("../models/User");

router.get("/", (req, res) => {
  User.findOne({ where: { id: req.user.id } }).then(user => {
    if (user) {
      res.json({ user });
    } else {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

module.exports = router;
