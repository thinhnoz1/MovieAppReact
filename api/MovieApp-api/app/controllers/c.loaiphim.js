// Import model Loaiphim
const Loaiphim = require("../models/mo.loaiphim.js");
// Create and Save a new Loaiphim
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Create a Loaiphim
  const loaiphim = new Loaiphim({
    maloaiphim: req.body.maloaiphim,
    tenloaiphim: req.body.tenloaiphim,
  });
  // Save Loaiphim in the database
  Loaiphim.create(loaiphim, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating...",
      });
    else res.send(data);
  });
};

// Retrieve all Menu from the database.
exports.findAll = function (req, res) {
  Loaiphim.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving...",
      });
    else res.send(data);
  });
};

// Find a single Menu with a menuID
exports.findOne = (req, res) => {
  Loaiphim.findById(req.params.loaiphimID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found with id ${req.params.loaiphimID}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving with id " + req.params.loaiphimID,
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

  Loaiphim.updateById(
    req.params.loaiphimID,
    new Loaiphim(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found with id ${req.params.loaiphimID}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating with id " + req.params.loaiphimID,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a with the specified in the request
exports.delete = (req, res) => {
  Loaiphim.remove(req.params.loaiphimID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found loai phim with id ${req.params.loaiphimID}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete loai phim with id " + req.params.loaiphimID,
        });
      }
    } else res.send({ message: `Loai phim was deleted successfully!` });
  });
};

// Delete all from the database.
exports.deleteAll = (req, res) => {};
