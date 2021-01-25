const sql = require("./db.js");
const Theloai = function (theloai) {
  this.matheloai = theloai.matheloai;
  this.tentheloai = theloai.tentheloai;
};

Theloai.create = (newTheloai, result) => {
  sql.query("INSERT INTO theloai SET ?", newTheloai, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created newTheloai: ", { id: res.insertId, ...newTheloai });
    result(null, { id: res.insertId, ...newTheloai });
  });
};

Theloai.findById = (theloaiID, result) => {
  sql.query(
    `SELECT * FROM theloai WHERE matheloai = ${theloaiID}`,
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

Theloai.getAll = (result) => {
  sql.query("SELECT * FROM theloai", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Theloai: ", res);
    result(null, res);
  });
};

Theloai.updateById = (matheloai, theloai, result) => {
  sql.query(
    "UPDATE theloai SET tentheloai = ? WHERE matheloai = ?",
    [theloai.tentheloai, matheloai],
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

      console.log("updated: ", { matheloai: matheloai, ...theloai });
      result(null, { matheloai: matheloai, ...theloai });
    }
  );
};

Theloai.remove = (matheloai, result) => {
  sql.query(
    "DELETE FROM theloai WHERE matheloai = ?",
    matheloai,
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

      console.log("deleted theloai with matheloai: ", matheloai);
      result(null, res);
    }
  );
};

Theloai.removeAll = (result) => {
  sql.query("DELETE FROM theloai", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} theloai`);
    result(null, res);
  });
};
// Export đối tượng

module.exports = Theloai;
