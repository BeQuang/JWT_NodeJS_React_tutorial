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

const createNewUser = async (email, password, username) => {
  let hashPass = hashUserPassword(password);

  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt_nodejs_react",
    Promise: bluebird,
  });

  try {
    const [rows, fields] = await connection.execute(
      "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
      [email, hashPass, username]
    );
    return rows;
  } catch (err) {
    console.log(err);
  }
};

const getUserList = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt_nodejs_react",
    Promise: bluebird,
  });

  try {
    const [rows, fields] = await connection.execute("SELECT * FROM users");
    return rows;
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt_nodejs_react",
    Promise: bluebird,
  });

  try {
    const [rows, fields] = await connection.execute(
      "DELETE FROM users WHERE id=?",
      [id]
    );
    return rows;
  } catch (err) {
    console.log(err);
  }
};

const getUserByID = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt_nodejs_react",
    Promise: bluebird,
  });

  try {
    const [rows, fields] = await connection.execute(
      "SELECT * FROM users WHERE id=?",
      [id]
    );
    return rows;
  } catch (err) {
    console.log(err);
  }
};

const updateUserInfor = async (email, username, id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt_nodejs_react",
    Promise: bluebird,
  });

  try {
    const [rows, fields] = await connection.execute(
      "UPDATE users SET email = ?, username = ? WHERE id = ?",
      [email, username, id]
    );
    return rows;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserByID,
  updateUserInfor,
};
