const coordinates = require("../models/coordinates");
const db = require("../config/mongo");

const postCoordinates = async (req, res) => {
  try {
    const data = req.body;
    box = data;
    var boundingBox = new coordinates.Coordinates(req.body);
    await res.status(200).json(boundingBox);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while receiving map coordinates",
    });
  }
  return box;
};

const getCoordinates = async (req, res, boundingBox) => {
  if (!boundingBox) {
    res.status(500).send({
      message:
        err.message || "Some error occurred fetching map view coordinates",
    });
  }
  await res.status(200).json(boundingBox);
  console.log(boundingBox);
};

const getMapReport = async (req, res) => {
  console.log(req);
  await db.Covid.find(
    {
      "region.cities.lat": {
        $gt: req.params.swLat,
        $lt: req.params.neLat,
      },
      "region.cities.long": {
        $gt: req.params.swLong,
        $lt: req.params.neLong,
      },
      "region.cities.confirmed": {
        $gt: 0,
      },
    },
    {
      "region.cities.lat": 1,
      "region.cities.long": 1,
      "region.cities.confirmed": 1,
      "region.province": 1,
      "region.cities.name": 1,
      _id: 0,
    },
    function (err, reports) {
      if (err) {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while fetching Covid reports in given area",
        });
        return;
      }
      return res.status(200).json(reports);
    }
  );
};

module.exports.getMapReport = getMapReport;
module.exports.postCoordinates = postCoordinates;
module.exports.getCoordinates = getCoordinates;
