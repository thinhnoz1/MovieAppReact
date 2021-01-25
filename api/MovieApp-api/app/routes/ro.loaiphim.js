module.exports = (app) => {
  const loaiphim = require("../controllers/c.loaiphim.js");
  // Create a new
  app.post("/loaiphim/ins", loaiphim.create);
  // Retrieve all
  app.get("/loaiphim/findall", loaiphim.findAll);
  // Retrieve a single with loaiphimID
  app.get("/loaiphim/findone/:loaiphimID", loaiphim.findOne);
  // Update a Customer with loaiphimID
  app.put("/loaiphim/update/:loaiphimID", loaiphim.update);
  // Delete a Customer with loaiphimID
  app.delete("/loaiphim/delone/:loaiphimID", loaiphim.delete);
  // delete all
  app.delete("/loaiphim/delall", loaiphim.deleteAll);
};
