// Import model phim
const Phim = require("../models/mo.phim.js");
// Create and Save a new phim
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Create a phim
  const phim = new Phim({
    maphim: req.body.maphim,
    tenphim: req.body.tenphim,
    matheloai: req.body.matheloai,
    maloaiphim: req.body.maloaiphim,
    thoigianramat: req.body.thoigianramat,
    quocgia: req.body.quocgia,
    linkphim: req.body.linkphim,
    linkposter: req.body.linkposter,
    motaphim: req.body.motaphim,
  });
  // Save phim in the database
  Phim.create(phim, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating...",
      });
    else res.send(data);
  });
};

// Retrieve all Menu from the database.
exports.findAll = function (req, res) {
  Phim.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving...",
      });
    else res.send(data);
  });
};

// Find a single Menu with a menuID
exports.findOne = (req, res) => {
  Phim.findById(req.params.phimID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found with id ${req.params.phimID}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving with id " + req.params.phimID,
        });
      }
    } else res.send(data);
  });
};

exports.findbyCategory = (req, res) => {
  Phim.findByCategory(req.params.theloaiID, (err, data) => {
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

  Phim.updateById(req.params.phimID, new Phim(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found with id ${req.params.phimID}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating with id " + req.params.phimID,
        });
      }
    } else res.send(data);
  });
};

// Delete a with the specified in the request
exports.delete = (req, res) => {
  Phim.remove(req.params.phimID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found phim with id ${req.params.phimID}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete phim with id " + req.params.phimID,
        });
      }
    } else res.send({ message: `Phim was deleted successfully!` });
  });
};

// Delete all from the database.
exports.deleteAll = (req, res) => {};
