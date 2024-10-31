import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";
import db from "../models";
import { where } from "sequelize/lib/sequelize";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  return bcrypt.hashSync(userPassword, salt);
};

const createNewUser = async (email, password, username) => {
  let hashPass = hashUserPassword(password);

  try {
    await db.User.create({
      email: email,
      password: hashPass,
      username: username,
    });
  } catch (err) {}
};

const getUserList = async () => {
  let users = await db.User.findAll();
  return users;
};

const deleteUser = async (userId) => {
  await db.User.destroy({
    where: {
      id: userId,
    },
  });
};

const getUserByID = async (id) => {
  let user = await db.User.findOne({
    where: { id: id },
  });

  return user.get({ plain: true });
};

const updateUserInfor = async (email, username, id) => {
  await db.User.update(
    { email: email, username: username },
    {
      where: {
        id: id,
      },
    }
  );
};

module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserByID,
  updateUserInfor,
};
