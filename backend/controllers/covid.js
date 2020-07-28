covidServices = require("../services/covid");

async function get_all_data(req, res) {
  await covidServices.getAllData(req, res);
}

async function get_map_report(req, res) {
  await covidServices.getMapReport(req, res);
}

module.exports.get_map_report = get_map_report;
module.exports.get_all_data = get_all_data;
