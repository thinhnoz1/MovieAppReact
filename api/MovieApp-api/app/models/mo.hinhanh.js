const sql = require("./db.js");
const Hinhanh = function (hinhanh) {
  this.mahinhanh = hinhanh.mahinhanh;
  this.tenhinhanh = hinhanh.tenhinhanh;
  this.maphim = hinhanh.maphim;
  this.linkhinhanh = hinhanh.linkhinhanh;
};

Hinhanh.create = (newHinhanh, result) => {
  sql.query("INSERT INTO hinhanh SET ?", newHinhanh, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created newHinhanh: ", { id: res.insertId, ...newHinhanh });
    result(null, { id: res.insertId, ...newHinhanh });
  });
};

Hinhanh.findById = (hinhanhID, result) => { //Find by mahinhanh
  sql.query(
    `SELECT * FROM hinhanh WHERE mahinhanh = ${hinhanhID}`,
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

Hinhanh.findByMaphim = (maphim, result) => {
  sql.query(`SELECT * FROM hinhanh WHERE maphim = ${maphim}`, (err, res) => {
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

Hinhanh.getAll = (result) => {
  sql.query("SELECT * FROM hinhanh", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Hinhanh: ", res);
    result(null, res);
  });
};

Hinhanh.updateByMahinhanh = (hinhanhID, hinhanh, result) => {
  sql.query(
    "UPDATE hinhanh SET tenhinhanh = ?, linkhinhanh = ?  WHERE mahinhanh = ?",
    [hinhanh.tenhinhanh, hinhanh.linkhinhanh, hinhanhID],
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

      console.log("updated: ", { hinhanhID: hinhanhID, ...hinhanh });
      result(null, { hinhanhID: hinhanhID, ...hinhanh });
    }
  );
};

Hinhanh.updateByMaphim = (maphim, hinhanh, result) => {
  sql.query(
    "UPDATE hinhanh SET tenhinhanh = ?, linkhinhanh = ?  WHERE maphim = ?",
    [hinhanh.tenhinhanh, hinhanh.linkhinhanh, maphim],
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

      console.log("updated: ", { maphim: maphim, ...hinhanh });
      result(null, { maphim: maphim, ...hinhanh });
    }
  );
};

Hinhanh.removeByMaphim = (maphim, result) => {
  sql.query("DELETE FROM hinhanh WHERE maphim = ?", maphim, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted hinhanh with maphim: ", maphim);
    result(null, res);
  });
};

Hinhanh.removeByMahinhanh = (mahinhanh, result) => {
  sql.query(
    "DELETE FROM hinhanh WHERE mahinhanh = ?",
    mahinhanh,
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

      console.log("deleted hinhanh with mahinhanh: ", mahinhanh);
      result(null, res);
    }
  );
};

module.exports = Hinhanh;