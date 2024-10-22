import mysql from "mysql2";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

// Create the connection to the database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "jwt_nodejs_react",
});

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

const getUserList = () => {
  let users = [];
  connection.query("SELECT * FROM users", function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log("check user list >>>> ", result);
  });
};

module.exports = {
  createNewUser,
  getUserList,
};
