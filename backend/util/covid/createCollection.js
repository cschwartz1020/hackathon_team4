const db = require("../../config/mongo");
const fetch = require("node-fetch");
const mongoose = require("mongoose");

async function createCollectionIfNotExists() {
  const conn = mongoose.createConnection("mongodb://mongo:27017/hackathonDB");
  var covidExists = false;
  conn.on("open", function () {
    conn.db.listCollections().toArray(function (err, collectionNames) {
      if (err) {
        console.log(err);
        return;
      }
      collectionNames.forEach((collection) => {
        if (collection.name === "covids") {
          covidExists = true;
        }
      });
      if (!covidExists) {
        dumpData();
      }
      conn.close();
    });
  });

  async function dumpData() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: {
        Accept: "application/json",
      },
    };

    await fetch("http://localhost:3000/api/covid/all", requestOptions)
      .then((response) => response.json())
      .then((result) => result.data)
      .then((data) => {
        prepareForMongo(data);
      })

      .catch((error) => console.log("error", error));
  }
}

function prepareForMongo(covidData) {
  covidData.forEach((item) => {
    db.Covid.create({
      date: item.date,
      confirmed: item.confirmed,
      deaths: item.deaths,
      recovered: item.recovered,
      confirmed_diff: item.confirmed_diff,
      deaths_diff: item.deaths_diff,
      recoverd_diff: item.recoverd_diff,
      last_update: item.last_update,
      active: item.active,
      active_diff: item.active_diff,
      fatality_rate: item.fatality_rate,
      region: item.region,
    }).catch((err) => {
      console.log(
        err.message,
        "Some error occurred while creating Covid collection"
      );
      return;
    });
  });
  console.log("Succesfully created Covid collection");
}

module.exports.createCollectionIfNotExists = createCollectionIfNotExists;
