userServices = require("../services/user");

async function create_user(req, res) {
  await userServices.create(req, res);
}

async function find_all_users(req, res) {
  await userServices.findAll(req, res);
}

async function find_one_user(req, res) {
  await userServices.findOne(req, res);
}

module.exports.create_user = create_user;
module.exports.find_all_users = find_all_users;
module.exports.find_one_user = find_one_user;
