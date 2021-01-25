const sql = require("./db.js");
const Bangxephang = function (bangxephang) {
  this.maphim = bangxephang.maphim;
  this.diemdanhgia = bangxephang.diemdanhgia;
};

Bangxephang.create = (newBangxephang, result) => {
  sql.query("INSERT INTO bangxephang SET ?", newBangxephang, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created newBangxephang: ", {
      id: res.insertId,
      ...newBangxephang,
    });
    result(null, { id: res.insertId, ...newBangxephang });
  });
};

Bangxephang.findById = (bangxephangID, result) => {
  sql.query(
    `SELECT * FROM bangxephang WHERE maphim = ${bangxephangID}`,
    (err, res) => {
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
    }
  );
};

Bangxephang.getAll = (result) => {
  sql.query("SELECT * FROM bangxephang", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Bangxephang: ", res);
    result(null, res);
  });
};

Bangxephang.updateById = (maphim, bangxephang, result) => {
  sql.query(
    "UPDATE bangxephang SET diemdanhgia = ?  WHERE maphim = ?",
    [bangxephang.diemdanhgia, maphim],
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

      console.log("updated: ", { maphim: maphim, ...bangxephang });
      result(null, { maphim: maphim, ...bangxephang });
    }
  );
};

Bangxephang.remove = (maphim, result) => {
  sql.query("DELETE FROM bangxephang WHERE maphim = ?", maphim, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted bangxephang with maphim: ", maphim);
    result(null, res);
  });
};

module.exports = Bangxephang;