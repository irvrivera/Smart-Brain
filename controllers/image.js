const { json } = require("body-parser");
const Clarifai = require("clarifai");
const USER_ID = "webmaker-2022";
const APP_ID = "my-first-application";
const PAT = "5f98e2b5698d4182b4939a67a36818fa";
const handleApiCall = (req, res) => {
  const app = new Clarifai.App({
    apiKey: "56f3c7e8487449789f7ee6a79a729ff3",
  });
  app.models
    .predict(
      {
        id: "a403429f2ddf4b49b307e318f00e528b",
        version: "34ce21a40cc24b6b96ffee54aabff139",
      },
      req.body.id
    )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json("unable to work with API");
    });
};

const handleImage = (request, response, db) => {
  const { id } = request.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      response.json(entries[0].entries);
    })
    .catch((err) =>
      response.status(400).json("Unable to get entry entry count")
    );
};

module.exports = {
  handleImage,
  handleApiCall,
};
