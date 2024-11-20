import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  return bcrypt.hashSync(userPassword, salt);
};

const checkEmailExist = async (userEmail) => {
  let user = await db.User.findOne({ where: { email: userEmail } });

  if (user) {
    return true;
  }
  return false;
};

const checkPhoneNumberExist = async (userPhoneNumber) => {
  let user = await db.User.findOne({ where: { phone: userPhoneNumber } });

  if (user) {
    return true;
  }
  return false;
};

const checkUsernameExist = async (userUsername) => {
  let user = await db.User.findOne({ where: { username: userUsername } });

  if (user) {
    return true;
  }
  return false;
};

const checkPassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword); // true or false
};

const validEPUPExists = async (rawUserData) => {
  let isUsernameExist = await checkUsernameExist(rawUserData.username);
  if (isUsernameExist) {
    return {
      EM: "The username is already registered",
      EC: 1,
      DT: "validUsername",
    };
  }
  let isEmailExist = await checkEmailExist(rawUserData.email);
  if (isEmailExist) {
    return {
      EM: "The email is already registered",
      EC: 1,
      DT: "validEmail",
    };
  }

  let isPhoneNumberExist = await checkPhoneNumberExist(rawUserData.phoneNumber);
  if (isPhoneNumberExist) {
    return {
      EM: "The phone number is already registered",
      EC: 1,
      DT: "validPhoneNumber",
    };
  }
  if (rawUserData.password && rawUserData.password.length < 4) {
    return {
      EM: "Your password must be at least 4 characters",
      EC: 1,
      DT: "validPassword",
    };
  }
};

module.exports = {
  hashUserPassword,
  checkPassword,
  validEPUPExists,
};
