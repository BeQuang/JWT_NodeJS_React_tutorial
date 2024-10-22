import userService from "../service/userService.js";

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

  // userService.createNewUser(email, password, username);
  userService.getUserList();

  return res.send("Create new user");
};

module.exports = {
  handleHomePage,
  handleUserPage,
  handleCreateNewUser,
};
