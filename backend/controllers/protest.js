protestServices = require("../services/protest");

async function create_protest(req, res) {
  await protestServices.create(req, res);
}

async function find_all_protests(req, res) {
  await protestServices.findAll(req, res);
}

async function find_one_protest(req, res) {
  await protestServices.findOne(req, res);
}

module.exports.create_protest = create_protest;
module.exports.find_all_protests = find_all_protests;
module.exports.find_one_protest = find_one_protest;
