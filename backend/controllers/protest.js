const db = require("../config/db");

const { sequelize } = require("../config/db");

const Protest = db.Protest;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  let protest = req.body;
  Protest.create(protest)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the protest event",
      });
    });
};

exports.findAll = (req, res) => {
  Protest.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while fetching all protest events",
      });
    });
};

exports.findOne = (req, res) => {};
