// Import model menu
const Hinhanh = require("../models/mo.hinhanh.js");
// Create and Save a new Menu
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Create a Hinhanh
  const hinhanh = new Hinhanh({
    mahinhanh: req.body.mahinhanh,
    tenhinhanh: req.body.tenhinhanh,
    maphim: req.body.maphim,
    linkhinhanh: req.body.linkhinhanh,
  });
  // Save Hinhanh in the database
  Hinhanh.create(hinhanh, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating...",
      });
    else res.send(data);
  });
};

// Retrieve all Menu from the database.
exports.findAll = function (req, res) {
  Hinhanh.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving...",
      });
    else res.send(data);
  });
};

// Find a single Menu with a menuID
exports.findOneWithId = (req, res) => {
  Hinhanh.findById(req.params.hinhanhID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found with id ${req.params.hinhanhID}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving with id " + req.params.hinhanhID,
        });
      }
    } else res.send(data);
  });
};

// Find a single Menu with a menuID
exports.findOneWithMaphim = (req, res) => {
  Hinhanh.findByMaphim(req.params.maphim, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found with id ${req.params.maphim}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving with id " + req.params.maphim,
        });
      }
    } else res.send(data);
  });
};

// Update a identified by the menuID in the request
exports.updateWithMahinhanh = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Hinhanh.updateByMahinhanh(
    req.params.hinhanhID,
    new Hinhanh(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found with id ${req.params.hinhanhID}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating with id " + req.params.hinhanhID,
          });
        }
      } else res.send(data);
    }
  );
};

// Update a identified by the menuID in the request
exports.updateWithMaphim = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Hinhanh.updateByMaphim(
    req.params.maphim,
    new Hinhanh(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found with id ${req.params.maphim}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating with id " + req.params.maphim,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a with the specified in the request
exports.deleteWithMaphim = (req, res) => {
  Hinhanh.removeByMaphim(req.params.maphim, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found hinh anh with id ${req.params.maphim}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete hinh anh with id " + req.params.maphim,
        });
      }
    } else res.send({ message: `Hinh anh was deleted successfully!` });
  });
};

// Delete a with the specified in the request
exports.deleteWithMahinhanh = (req, res) => {
  Hinhanh.removeByMahinhanh(req.params.mahinhanh, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found hinh anh with id ${req.params.mahinhanh}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete hinh anh with id " + req.params.mahinhanh,
        });
      }
    } else res.send({ message: `Hinh anh was deleted successfully!` });
  });
};
