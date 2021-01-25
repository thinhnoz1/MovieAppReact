const sql = require("./db.js");
const Phim = function (phim) {
  this.maphim = phim.maphim;
  this.tenphim = phim.tenphim;
  this.matheloai = phim.matheloai;
  this.maloaiphim = phim.maloaiphim;
  this.thoigianramat = phim.thoigianramat;
  this.quocgia = phim.quocgia;
  this.linkphim = phim.linkphim;
  this.linkposter = phim.linkposter;
  this.motaphim = phim.motaphim;
  this.diemdanhgia = phim.diemdanhgia;
};

Phim.create = (newPhim, result) => {
  sql.query("INSERT INTO phim SET ?", newPhim, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created newPhim: ", { id: res.insertId, ...newPhim });
    result(null, { id: res.insertId, ...newPhim });
  });
};

Phim.findById = (phimID, result) => {
  sql.query(`SELECT * FROM phim WHERE maphim = ${phimID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Phim.findByCategory = (theloaiID, result) => {
  sql.query(`SELECT * FROM phim WHERE matheloai = ${theloaiID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found: ", res);
      result(null, res);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Phim.getAll = (result) => {
  sql.query("SELECT * FROM phim", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Phim: ", res);
    result(null, res);
  });
};

Phim.updateById = (maphim, phim, result) => {
  sql.query(
    "UPDATE phim SET tenphim = ?, matheloai = ?, maloaiphim = ?, thoigianramat = ?, quocgia = ?, linkphim = ?, linkposter = ?, motaphim = ?, diemdanhgia = ?  WHERE maphim = ?",
    [
      phim.tenphim,
      phim.matheloai,
      phim.maloaiphim,
      phim.thoigianramat,
      phim.quocgia,
      phim.linkphim,
      phim.linkposter,
      phim.motaphim,
      phim.diemdanhgia,
      maphim,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated: ", { maphim: maphim, ...phim });
      result(null, { maphim: maphim, ...phim });
    }
  );
};

Phim.remove = (maphim, result) => {
  sql.query("DELETE FROM phim WHERE maphim = ?", maphim, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted phim with maphim: ", maphim);
    result(null, res);
  });
};

Phim.removeAll = (result) => {
  sql.query("DELETE FROM phim", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} phim`);
    result(null, res);
  });
};
// Export đối tượng

module.exports = Phim;
