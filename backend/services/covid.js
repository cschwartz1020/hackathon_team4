const coordinateSchema = require("../models/coordinates");
const coordinates = require("../models/coordinates");

var boundingBox;

async function postCoordinates(req, res) {
  var boundingBox = new coordinates.Coordinates(req.body);
  res.status(200).json(boundingBox);
}

module.exports.postCoordinates = postCoordinates;
