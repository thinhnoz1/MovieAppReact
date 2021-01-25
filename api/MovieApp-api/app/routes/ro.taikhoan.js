module.exports = (app) => {
  const taikhoan = require("../controllers/c.taikhoan.js");
  // Create a new
  app.post("/taikhoan/ins", taikhoan.create);
  // Retrieve all
  app.get("/taikhoan/findall", taikhoan.findAll);
  // Retrieve a single with taikhoanID
  app.get("/taikhoan/findone/:taikhoanID", taikhoan.findOne);
  // Update a Customer with taikhoanID
  app.put("/taikhoan/update/:taikhoanID", taikhoan.update);
  // Delete a Customer with taikhoanID
  app.delete("/taikhoan/delone/:taikhoanID", taikhoan.delete);
  // delete all
  app.delete("/taikhoan/delall", taikhoan.deleteAll);
};
