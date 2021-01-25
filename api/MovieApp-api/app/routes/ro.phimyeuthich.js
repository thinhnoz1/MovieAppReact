module.exports = (app) => {
  const phimyeuthich = require("../controllers/c.phimyeuthich.js");
  // Create a new
  app.post("/phimyeuthich/ins", phimyeuthich.create);
  // Retrieve all
  app.get("/phimyeuthich/findall", phimyeuthich.findAll);
  // Retrieve a single with phimyeuthichID
  app.get("/phimyeuthich/findone/:phimyeuthichID", phimyeuthich.findOne);
  // Update a Customer with phimyeuthichID
  app.put("/phimyeuthich/update/:phimyeuthichID", phimyeuthich.update);
  // Delete a Customer with phimyeuthichID
  app.delete("/phimyeuthich/delone/:phimyeuthichID", phimyeuthich.delete);
  // delete all
  app.delete("/phimyeuthich/delall", phimyeuthich.deleteAll);
};
