import db from "../models/index";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import Validate from "../Validate/Validate";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  return bcrypt.hashSync(userPassword, salt);
};

const registerNewUser = async (rawUserData) => {
  try {
    //check email/phoneNumber/username are exists
    let validRegister = await Validate.validEPUPExists(rawUserData);

    if (validRegister && validRegister.EC === 1) {
      return validRegister;
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
      let isCorrectPassword = Validate.checkPassword(
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
