const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

//Connection set up
const PORT = process.env.PORT || 3000;

//Express and compression set up
const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


//Mongoose set up
mongoose.connect("mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: false
});

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://User27:Password27@ds263928.mlab.com:63928/heroku_l4mqwxq7",
  {
    useMongoClient: true
  }
);

//Routes
app.use(require("./routes/api.js"));


//Listening on
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});