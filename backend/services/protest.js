const db = require("../config/mongo");

async function create(req, res) {
  let newProtest = await db.Protest.create({
    time: req.body.time,
    startLocation: req.body.startLocation,
    endLocation: req.body.endLocation,
    title: req.body.title,
    summary: req.body.summary,
    resources: req.body.resources,
    attendanceCount: req.body.attendanceCount,
  }).catch((err) => {
    console.log(err);
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the protest event",
    });
    return;
  });
  return res.status(200).json(newProtest);
}

async function findAll(req, res) {
  await db.Protest.find({}, function (err, protests) {
    if (err) {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while fetching all the protest events",
      });
      return;
    }
    return res.status(200).json(protests);
  });
}

async function findOne(req, res) {
  await db.Protest.findById(req.params.id).exec(function (err, protest) {
    if (err) {
      res.status(400).send({
        message:
          err.message || `Can't find protest event with ID ${req.params.id}`,
      });
      return;
    }
    return res.status(200).json(protest);
  });
}

async function findByIdAndUpdate(req, res) {
  await db.Protest.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, protest) => {
      if (err) {
        return res
          .status(500)
          .send(
            err.message ||
              `Some error occurred while updating protest with ID ${req.params.id}`
          );
      }
      return res.send(protest);
    }
  );
}

module.exports.create = create;
module.exports.findAll = findAll;
module.exports.findOne = findOne;
module.exports.findByIdAndUpdate = findByIdAndUpdate;
