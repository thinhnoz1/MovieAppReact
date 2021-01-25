module.exports = (app) => {
  const bangxephang = require("../controllers/c.bangxephang.js");
  // Create a new
  app.post("/bangxephang/ins", bangxephang.create);
  // Retrieve all
  app.get("/bangxephang/findall", bangxephang.findAll);
  // Retrieve a single with bangxephangID
  app.get("/bangxephang/findone/:bangxephangID", bangxephang.findOne);
  // Update a Customer with bangxephangID
  app.put("/bangxephang/update/:bangxephangID", bangxephang.update);
  // Delete a Customer with bangxephangID
  app.delete("/bangxephang/delone/:bangxephangID", bangxephang.delete);
  // delete all
  app.delete("/bangxephang/delall", bangxephang.deleteAll);
};
