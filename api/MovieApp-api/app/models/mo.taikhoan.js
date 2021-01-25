const sql = require("./db.js");
const Taikhoan = function (taikhoan) {
  this.mataikhoan = taikhoan.mataikhoan;
  this.tentaikhoan = taikhoan.tentaikhoan;
  this.matkhau = taikhoan.matkhau;
};

Taikhoan.create = (newTaikhoan, result) => {
  sql.query("INSERT INTO taikhoan SET ?", newTaikhoan, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created newTaikhoan: ", { id: res.insertId, ...newTaikhoan });
    result(null, { id: res.insertId, ...newTaikhoan });
  });
};

Taikhoan.findById = (taikhoanID, result) => {
  sql.query(
    `SELECT * FROM taikhoan WHERE mataikhoan = ${taikhoanID}`,
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

Taikhoan.getAll = (result) => {
  sql.query("SELECT * FROM taikhoan", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Taikhoan: ", res);
    result(null, res);
  });
};

Taikhoan.updateById = (mataikhoan, taikhoan, result) => {
  sql.query(
    "UPDATE taikhoan SET tentaikhoan = ?, matkhau = ? WHERE mataikhoan = ?",
    [taikhoan.tentaikhoan, taikhoan.matkhau, mataikhoan],
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

      console.log("updated: ", { mataikhoan: mataikhoan, ...taikhoan });
      result(null, { mataikhoan: mataikhoan, ...taikhoan });
    }
  );
};

Taikhoan.remove = (mataikhoan, result) => {
  sql.query(
    "DELETE FROM taikhoan WHERE mataikhoan = ?",
    mataikhoan,
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

      console.log("deleted taikhoan with mataikhoan: ", mataikhoan);
      result(null, res);
    }
  );
};

Taikhoan.removeAll = (result) => {
  sql.query("DELETE FROM taikhoan", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} taikhoan`);
    result(null, res);
  });
};
// Export đối tượng

module.exports = Taikhoan;
