covidServices = require("../services/covid");
var boundingBox;

async function post_coordinates(req, res) {
  boundingBox = await covidServices.postCoordinates(req, res);
}

async function get_coordinates(req, res) {
  await covidServices.getCoordinates(req, res, boundingBox);
}

async function get_map_report(req, res) {
  await covidServices.getMapReport(req, res, boundingBox);
}

module.exports.post_coordinates = post_coordinates;
module.exports.get_coordinates = get_coordinates;
module.exports.get_map_report = get_map_report;
