// Import model menu
const Taikhoan = require("../models/mo.taikhoan.js");
// Create and Save a new Menu
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Create a Taikhoan
  const taikhoan = new Taikhoan({
    mataikhoan: req.body.mataikhoan,
    tentaikhoan: req.body.tentaikhoan,
    matkhau: req.body.matkhau,
  });
  // Save Taikhoan in the database
  Taikhoan.create(taikhoan, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating...",
      });
    else res.send(data);
  });
};

// Retrieve all Menu from the database.
exports.findAll = function (req, res) {
  Taikhoan.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving...",
      });
    else res.send(data);
  });
};

// Find a single Menu with a menuID
exports.findOne = (req, res) => {
  Taikhoan.findById(req.params.taikhoanID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found with id ${req.params.taikhoanID}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving with id " + req.params.taikhoanID,
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

  Taikhoan.updateById(
    req.params.taikhoanID,
    new Taikhoan(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found with id ${req.params.taikhoanID}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating with id " + req.params.taikhoanID,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a with the specified in the request
exports.delete = (req, res) => {
  Taikhoan.remove(req.params.taikhoanID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found tai khoan with id ${req.params.taikhoanID}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete tai khoan with id " + req.params.taikhoanID,
        });
      }
    } else res.send({ message: `Tai khoan was deleted successfully!` });
  });
};

// Delete all from the database.
exports.deleteAll = (req, res) => {};
