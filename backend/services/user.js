const db = require("../config/mongo");

async function create(req, res) {
  let newUser = await db.User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    protests: req.body.protests,
  }).catch((err) => {
    console.log(err);
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user",
    });
    return;
  });
  return res.status(200).json(newUser);
}

async function findAll(req, res) {
  await db.User.find({}, function (err, users) {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while fetching all users",
      });
    }
    return res.status(200).json(users);
  });
}

async function findOne(req, res) {
  await db.User.findById(req.params.id).exec(function (err, user) {
    if (err) {
      res.status(400).send({
        message: err.message || `Can't find user with id ${req.params.id}`,
      });
      return;
    }
    return res.status(200).json(user);
  });
}

module.exports.create = create;
module.exports.findAll = findAll;
module.exports.findOne = findOne;
