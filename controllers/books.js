const express = require("express");
const router = express.Router();
const sequelize = require("../db");
const Book = sequelize.import("../models/Book");

router.post("/", (req, res) => {
  const { title, author, review, publicationYear } = req.body;

  Book.create({
    title,
    author,
    review,
    publicationYear,
    owner: req.user.id
  }).then(
    book => {
      res.json({ book });
    },
    err => res.status(500, err.message)
  );
});

router.get("/", (req, res) => {
  Book.findAll({ where: { owner: req.user.id } }).then(
    books => res.json({ books }),
    err => res.send(500, err.message)
  );
});

router.delete("/:id", (req, res) => {
  Book.destroy({ where: { id: req.params.id, owner: req.user.id } }).then(
    () => res.send("You deleted a book"),
    err => res.send(500, err.message)
  );
});

router.put("/:id", function(req, res) {
  const { title, author, review, publicationYear } = req.body;

  Book.update(
    {
      title,
      author,
      review,
      publicationYear
    },
    { where: { id: req.params.id } }
  ).then(
    book => {
      res.json(book);
    },
    err => res.send(500, err.message)
  );
});

module.exports = router;
