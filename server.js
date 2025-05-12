// Loads the express module
const express = require("express");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const path = require("path");

//Creates our express server
const app = express();
const port = 3000;

//Serves static files (we need it to import a css file)
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));

//Sets a basic route
app.get("/", (req, res) => {
  res.render("index");
});

// Handle both GET and POST requests for /happy
app.get("/happy", (req, res) => {
  res.render("happy");
});

app.post("/happy", (req, res) => {
  // Pass the form data to the happy template
  res.render("happy", { formData: req.body });
});

//Makes the app listen to port 3000
app.listen(port, () => console.log(`App listening to port ${port}`));