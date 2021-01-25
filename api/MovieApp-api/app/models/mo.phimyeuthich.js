const sql = require("./db.js");
const Phimyeuthich = function (phimyeuthich) {
  this.maphim = phimyeuthich.maphim;
  this.mataikhoan = phimyeuthich.mataikhoan;
};

Phimyeuthich.create = (newPhimyeuthich, result) => {
  sql.query("INSERT INTO phimyeuthich SET ?", newPhimyeuthich, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created newPhimyeuthich: ", {
      id: res.insertId,
      ...newPhimyeuthich,
    });
    result(null, { id: res.insertId, ...newPhimyeuthich });
  });
};

Phimyeuthich.findById = (phimyeuthichID, result) => {
  sql.query(
    `SELECT * FROM phimyeuthich WHERE mataikhoan = ${phimyeuthichID}`,
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

Phimyeuthich.getAll = (result) => {
  sql.query("SELECT * FROM phimyeuthich", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Phimyeuthich: ", res);
    result(null, res);
  });
};

Phimyeuthich.updateById = (mataikhoan, phimyeuthich, result) => {
  sql.query(
    "UPDATE phimyeuthich SET maphim = ? WHERE mataikhoan = ?",
    [phimyeuthich.maphim, mataikhoan],
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

      console.log("updated: ", { mataikhoan: mataikhoan, ...phimyeuthich });
      result(null, { mataikhoan: mataikhoan, ...phimyeuthich });
    }
  );
};

Phimyeuthich.remove = (maphim, result) => {
  sql.query("DELETE FROM phimyeuthich WHERE maphim = ?", maphim, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted phimyeuthich with maphim: ", maphim);
    result(null, res);
  });
};

Phimyeuthich.removeAll = (result) => {
  sql.query("DELETE FROM phimyeuthich", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} phimyeuthich`);
    result(null, res);
  });
};
// Export đối tượng

module.exports = Phimyeuthich;
