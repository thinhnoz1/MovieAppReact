// Import model phimyeuthich
const Phimyeuthich = require("../models/mo.phimyeuthich.js");
// Create and Save a new phimyeuthich
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Create a phimyeuthich
  const phimyeuthich = new Phimyeuthich({
    maphim: req.body.maphim,
    mataikhoan: req.body.mataikhoan,
  });
  // Save Menu in the database
  Phimyeuthich.create(phimyeuthich, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating...",
      });
    else res.send(data);
  });
};

// Retrieve all Menu from the database.
exports.findAll = function (req, res) {
  Phimyeuthich.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving...",
      });
    else res.send(data);
  });
};

// Find a single Menu with a menuID
exports.findOne = (req, res) => {
  Phimyeuthich.findById(req.params.phimyeuthichID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found with id ${req.params.phimyeuthichID}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving with id " + req.params.phimyeuthichID,
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

  Phimyeuthich.updateById(
    req.params.phimyeuthichID,
    new Phimyeuthich(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found with id ${req.params.phimyeuthichID}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating with id " + req.params.phimyeuthichID,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a with the specified in the request
exports.delete = (req, res) => {
  Phimyeuthich.remove(req.params.phimyeuthichID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found phim <3 with id ${req.params.phimyeuthichID}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete phim <3 with id " + req.params.phimyeuthichID,
        });
      }
    } else res.send({ message: `Phim <3 was deleted successfully!` });
  });
};

// Delete all from the database.
exports.deleteAll = (req, res) => {};
