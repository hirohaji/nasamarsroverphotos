const express = require("express");
const path = require("path");
require("dotenv/config");

const app = express();
const apiNasa = require("./services/apiNasa");

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Put all API endpoints under '/api'
app.get("/api/rovers/:rover/photos", (req, res) => {
  if (req.query.sol) {
    apiNasa
    .get(
      `v1/rovers/${req.params.rover}/photos?sol=${req.query.sol}&page=${req.query.page}&api_key=${process.env.API_KEY}`
    )
    .then(data => {
      res.json(data.data);
    });
  } else if (req.query.earth_date) {
    apiNasa
    .get(
      `v1/rovers/${req.params.rover}/photos?earth_date=${req.query.earth_date}&page=${req.query.page}&api_key=${process.env.API_KEY}`
    )
    .then(data => {
      res.json(data.data);
    });
  }
  
});

app.get("/api/rovers", (req, res) => {
  apiNasa
    .get(
      `v1/rovers/?api_key=${process.env.API_KEY}`
    )
    .then(data => {
      res.json(data.data);
    });
});

app.get("/api/rovers/:rover/latest_photos", (req, res) => {
  apiNasa
    .get(
      `v1/rovers/${req.params.rover}/latest_photos?api_key=${process.env.API_KEY}`
    )
    .then(data => {
      res.json(data.data);
    });
});

app.get("/api/test", (req, res) => {
  console.log("api/test", req.params);
  res.json({ test: "ok" });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
