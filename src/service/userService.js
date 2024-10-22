import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";

const salt = bcrypt.genSaltSync(10);

// Create the connection to the database
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "jwt_nodejs_react",
// });

const hashUserPassword = (userPassword) => {
  return bcrypt.hashSync(userPassword, salt);
};

const createNewUser = (email, password, username) => {
  let hashPass = hashUserPassword(password);

  connection.query(
    "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
    [email, hashPass, username],
    function (err, result) {
      if (err) {
        console.log(err);
      }
    }
  );
};

const getUserList = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt_nodejs_react",
    Promise: bluebird,
  });

  let users = [];
  //   connection.query("SELECT * FROM users", function (err, result) {
  //     if (err) {
  //       console.log(err);
  //       return users;
  //     }
  //     users = result;
  //     return users;
  //   });

  try {
    const [rows, fields] = await connection.execute("SELECT * FROM users");
    return rows;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createNewUser,
  getUserList,
};
