require("dotenv").config();
const express = require("express");
const app = express();
const user = require("./controllers/user");
const auth = require("./controllers/auth");
const book = require("./controllers/books");

const sequelize = require("./db");

sequelize.sync();

app.use(express.json({ extended: false }));

app.use(require("./middleware/headers"));
app.use("/api/user", user);

app.use(require("./middleware/auth"));
app.use("/api/auth", auth);
app.use("/api/books", book);

app.listen(process.env.PORT, () => console.log("server running"));
