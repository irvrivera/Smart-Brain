const bodyParser = require("body-parser");
const { request, response } = require("express");
const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  },
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("It's working!");
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.post("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageUrl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`my app is working on port ${process.env.PORT}`);
});

// route res  = this is working / establishes a connection to postman.
// signin --> Post = success/fail
// register --> Post = new uer
// profile/:userId --> GET = USER
// image --> put --> user
