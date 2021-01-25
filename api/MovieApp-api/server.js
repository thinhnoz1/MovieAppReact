const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ message: "Welcome to MovieApp application." });
});

require("./app/routes/ro.bangxephang.js")(app);
require("./app/routes/ro.hinhanh.js")(app);
require("./app/routes/ro.loaiphim.js")(app);
require("./app/routes/ro.phim.js")(app);
require("./app/routes/ro.phimyeuthich.js")(app);
require("./app/routes/ro.taikhoan.js")(app);
require("./app/routes/ro.theloai.js")(app);

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
