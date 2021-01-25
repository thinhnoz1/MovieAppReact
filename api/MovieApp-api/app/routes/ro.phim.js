module.exports = (app) => {
  const phim = require("../controllers/c.phim.js");
  // Create a new
  app.post("/phim/ins", phim.create);
  // Retrieve all
  app.get("/phim/findall", phim.findAll);
  // Retrieve a single with phimID
  app.get("/phim/findone/:phimID", phim.findOne);
  //
  app.get("/phim/findbycategory/:theloaiID", phim.findbyCategory);
  // Update a Customer with phimID
  app.put("/phim/update/:phimID", phim.update);
  // Delete a Customer with phimID
  app.delete("/phim/delone/:phimID", phim.delete);
  // delete all
  app.delete("/phim/delall", phim.deleteAll);
};
