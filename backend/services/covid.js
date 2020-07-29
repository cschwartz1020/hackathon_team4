const db = require("../config/mongo");
const fetch = require("node-fetch");

const getAllData = async (req, res) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  await fetch("https://covid-api.com/api/reports", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Some error occurred while fetching COVID data from John's Hokpins API",
      });
    });
};

const getMapReport = async (req, res) => {
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
module.exports.getAllData = getAllData;
