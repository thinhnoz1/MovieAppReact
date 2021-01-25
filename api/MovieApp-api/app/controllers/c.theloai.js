// Import model menu
const Theloai = require("../models/mo.theloai.js");
// Create and Save a new Theloai
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Create a Theloai
  const theloai = new Theloai({
    matheloai: req.body.matheloai,
    tentheloai: req.body.tentheloai,
  });
  // Save Theloai in the database
  Theloai.create(theloai, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating...",
      });
    else res.send(data);
  });
};

// Retrieve all Menu from the database.
exports.findAll = function (req, res) {
  Theloai.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving...",
      });
    else res.send(data);
  });
};

// Find a single Menu with a menuID
exports.findOne = (req, res) => {
  Theloai.findById(req.params.theloaiID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found with id ${req.params.theloaiID}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving with id " + req.params.theloaiID,
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

  Theloai.updateById(
    req.params.theloaiID,
    new Theloai(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found with id ${req.params.theloaiID}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating with id " + req.params.theloaiID,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a with the specified in the request
exports.delete = (req, res) => {
  Theloai.remove(req.params.theloaiID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found the loai with id ${req.params.theloaiID}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete the loai with id " + req.params.theloaiID,
        });
      }
    } else res.send({ message: `The loai was deleted successfully!` });
  });
};

// Delete all from the database.
exports.deleteAll = (req, res) => {};
