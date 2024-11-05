import db from "../models/index";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";

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

const registerNewUser = async (rawUserData) => {
  try {
    //check email/phoneNumber/username are exists
    let isUsernameExist = await checkUsernameExist(rawUserData.username);
    if (isUsernameExist) {
      return {
        EM: "The username is already registered",
        EC: 1,
      };
    }
    let isEmailExist = await checkEmailExist(rawUserData.email);
    if (isEmailExist) {
      return {
        EM: "The email is already registered",
        EC: 1,
      };
    }

    let isPhoneNumberExist = await checkPhoneNumberExist(
      rawUserData.phoneNumber
    );
    if (isPhoneNumberExist) {
      return {
        EM: "The phone number is already registered",
        EC: 1,
      };
    }
    if (rawUserData.password && rawUserData.password.length < 4) {
      return {
        EM: "Your password must be at least 4 characters",
        EC: 1,
      };
    }

    // hash userPassword
    let hashPassword = hashUserPassword(rawUserData.password);

    // crete new user
    await db.User.create({
      username: rawUserData.username,
      email: rawUserData.email,
      password: hashPassword,
      sex: rawUserData.gender,
      address: rawUserData.address,
      phone: rawUserData.phoneNumber,
    });

    return {
      EM: "A user is created successfully",
      EC: 0,
    };
  } catch (err) {
    console.log(err);
    return {
      EM: "Something wrong in server response",
      EC: -2,
    };
  }
};

const handleUserLogin = async (rawData) => {
  try {
    let user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: rawData.valueLogin }, { phone: rawData.valueLogin }],
      },
    });

    if (user) {
      console.log(">>>> Found user");
      let isCorrectPassword = checkPassword(
        rawData.passwordLogin,
        user.password
      );

      if (isCorrectPassword) {
        return {
          EM: "Login successfully",
          EC: 0,
          DT: "",
        };
      }
    }
    console.log(
      ">>> Input user with email/phone number: ",
      rawData.valueLogin,
      "password: ",
      rawData.passwordLogin
    );
    return {
      EM: "Your email/phone number or password is incorrect",
      EC: -1,
      DT: "",
    };
  } catch (err) {
    console.log(err);
    return {
      EM: "Something wrong in server response",
      EC: -2,
      DT: "",
    };
  }
};

module.exports = {
  registerNewUser,
  handleUserLogin,
};
