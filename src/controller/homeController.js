import mysql from "mysql2";

// Create the connection to the database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "jwt_nodejs_react",
});

const handleHomePage = (req, res) => {
  return res.render("home.ejs");
};

const handleUserPage = (req, res) => {
  return res.render("user.ejs");
};

const handleCreateNewUser = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;

  connection.query(
    "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
    [email, password, username],
    function (err, result) {
      if (err) {
        console.log(err);
      }
    }
  );

  return res.send("Create new user");
};

module.exports = {
  handleHomePage,
  handleUserPage,
  handleCreateNewUser,
};
