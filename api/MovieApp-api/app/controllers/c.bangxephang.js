// Import model menu
const Bangxephang = require("../models/mo.bangxephang.js");
// Create and Save a new Menu
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Create a Menu
  const bangxephang = new Bangxephang({
    maphim: req.body.maphim,
    diemdanhgia: req.body.diemdanhgia,
  });
  // Save bangxephang in the database
  Bangxephang.create(bangxephang, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating...",
      });
    else res.send(data);
  });
};

// Retrieve all Menu from the database.
exports.findAll = function (req, res) {
  Bangxephang.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving...",
      });
    else res.send(data);
  });
};

// Find a single Menu with a menuID
exports.findOne = (req, res) => {
  Bangxephang.findById(req.params.bangxephangID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found with id ${req.params.bangxephangID}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving with id " + req.params.bangxephangID,
        });
      }
    } else res.send(data);
  });
};

// Update a identified by the menuID in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Bangxephang.updateById(
    req.params.bangxephangID,
    new Bangxephang(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found with id ${req.params.bangxephangID}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating with id " + req.params.bangxephangID,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a with the specified in the request
exports.delete = (req, res) => {
  Bangxephang.remove(req.params.bangxephangID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found bxh with id ${req.params.bangxephangID}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete bxh with id " + req.params.bangxephangID,
        });
      }
    } else res.send({ message: `Bxh was deleted successfully!` });
  });
};

// Delete all from the database.
exports.deleteAll = (req, res) => {};
