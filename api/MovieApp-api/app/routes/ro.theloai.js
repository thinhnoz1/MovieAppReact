module.exports = (app) => {
  const theloai = require("../controllers/c.theloai.js");
  // Create a new
  app.post("/theloai/ins", theloai.create);
  // Retrieve all
  app.get("/theloai/findall", theloai.findAll);
  // Retrieve a single with theloaiID
  app.get("/theloai/findone/:theloaiID", theloai.findOne);
  // Update a Customer with theloaiID
  app.put("/theloai/update/:theloaiID", theloai.update);
  // Delete a Customer with theloaiID
  app.delete("/theloai/delone/:theloaiID", theloai.delete);
  // delete all
  app.delete("/theloai/delall", theloai.deleteAll);
};
