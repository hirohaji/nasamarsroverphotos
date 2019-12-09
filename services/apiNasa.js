const axios = require("axios");

const apiNasa = axios.create({ baseURL: "https://api.nasa.gov/mars-photos/api" });

module.exports = apiNasa;
