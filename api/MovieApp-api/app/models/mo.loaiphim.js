const sql = require("./db.js");
const Loaiphim = function (loaiphim) {
  this.maloaiphim = loaiphim.maloaiphim;
  this.tenloaiphim = loaiphim.tenloaiphim;
};

Loaiphim.create = (newLoaiphim, result) => {
  sql.query("INSERT INTO loaiphim SET ?", newLoaiphim, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created newLoaiphim: ", { id: res.insertId, ...newLoaiphim });
    result(null, { id: res.insertId, ...newLoaiphim });
  });
};

Loaiphim.findById = (loaiphimID, result) => {
  sql.query(
    `SELECT * FROM loaiphim WHERE maloaiphim = ${loaiphimID}`,
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

Loaiphim.getAll = (result) => {
  sql.query("SELECT * FROM loaiphim", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Loaiphim: ", res);
    result(null, res);
  });
};

Loaiphim.updateById = (maloaiphim, loaiphim, result) => {
  sql.query(
    "UPDATE loaiphim SET tenloaiphim = ?  WHERE maloaiphim = ?",
    [loaiphim.tenloaiphim, maloaiphim],
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

      console.log("updated: ", { maloaiphim: maloaiphim, ...loaiphim });
      result(null, { maloaiphim: maloaiphim, ...loaiphim });
    }
  );
};

Loaiphim.remove = (maloaiphim, result) => {
  sql.query(
    "DELETE FROM loaiphim WHERE maloaiphim = ?",
    maloaiphim,
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

      console.log("deleted loaiphim with maloaiphim: ", maloaiphim);
      result(null, res);
    }
  );
};

module.exports = Loaiphim;