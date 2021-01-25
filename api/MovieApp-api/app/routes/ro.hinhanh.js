module.exports = (app) => {
  const hinhanh = require("../controllers/c.hinhanh.js");
  // Create a new
  app.post("/hinhanh/create", hinhanh.create);
  // Retrieve all
  app.get("/hinhanh/findAll", hinhanh.findAll);
  // Retrieve a single with hinhanhID
  app.get("/hinhanh/findOneWithId/:hinhanhID", hinhanh.findOneWithId);
  // Retrieve a single with maphim
  app.get("/hinhanh/findOneWithMaphim/:maphim", hinhanh.findOneWithMaphim);
  // Update a Customer with hinhanhID
  app.put(
    "/hinhanh/updateWithMahinhanh/:hinhanhID",
    hinhanh.updateWithMahinhanh
  );
  // Update a Customer with hinhanhID
  app.put("/hinhanh/updateWithMaphim/:maphim", hinhanh.updateWithMaphim);
  // Delete a Customer with hinhanhID
  app.delete(
    "/hinhanh/deleteWithMahinhanh/:mahinhanh",
    hinhanh.deleteWithMahinhanh
  );
  // Delete a Customer with hinhanhID
  app.delete("/hinhanh/deleteWithMaphim/:maphim", hinhanh.deleteWithMaphim);
};
