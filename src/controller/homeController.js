import userService from "../service/userService.js";

const handleHomePage = (req, res) => {
  return res.render("home.ejs");
};

const handleUserPage = async (req, res) => {
  // model => get data from database
  let userList = await userService.getUserList();

  return res.render("user.ejs", { userList });
};

const handleCreateNewUser = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;

  userService.createNewUser(email, password, username);

  return res.redirect("/user");
};

const handleDeleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id);
  return res.redirect("/user");
};

const getUpdateUserPage = async (req, res) => {
  let id = req.params.id;
  let user = await userService.getUserByID(id);
  let userData = user;

  console.log("check user", userData);
  return res.render("userUpdate.ejs", { userData });
};

const handleUpdateUser = async (req, res) => {
  let email = req.body.email;
  let username = req.body.username;
  let id = req.body.id;

  await userService.updateUserInfor(email, username, id);

  return res.redirect("/user");
};

module.exports = {
  handleHomePage,
  handleUserPage,
  handleCreateNewUser,
  handleDeleteUser,
  getUpdateUserPage,
  handleUpdateUser,
};
