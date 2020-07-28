covidServices = require("../services/covid");

async function post_coordinates(req, res) {
  await covidServices.postCoordinates(req, res);
}

module.exports.post_coordinates = post_coordinates;
