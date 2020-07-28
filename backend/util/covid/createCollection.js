const db = require("../../config/mongo");
const fetch = require("node-fetch");

async function createCollection() {
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

function prepareForMongo(covidData) {
  let i = 1;
  covidData.forEach((item) => {
    if (i == 1) {
      console.log(item);
      i++;
    }
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

module.exports.createCollection = createCollection;
