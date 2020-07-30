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

async function find_user_and_update(req, res) {
  await userServices.findByIdAndUpdate(req, res);
}

async function find_user_by_email(req, res) {
  await userServices.findByEmail(req, res);
}

async function find_user_by_email_and_update(req, res) {
  await userServices.findByEmailAndUpdate(req, res);
}

module.exports.create_user = create_user;
module.exports.find_all_users = find_all_users;
module.exports.find_one_user = find_one_user;
module.exports.find_user_and_update = find_user_and_update;
module.exports.find_user_by_email = find_user_by_email;
module.exports.find_user_by_email_and_update = find_user_by_email_and_update;
