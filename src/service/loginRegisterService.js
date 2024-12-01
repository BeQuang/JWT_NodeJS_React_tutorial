import db from "../models/index";
import { Op } from "sequelize";
import Validate from "../Validate/Validate";
import { getGroupWithRoles } from "./JWTService";
import { createJWT } from "../middleware/JWTActions";

require("dotenv").config();

const registerNewUser = async (rawUserData) => {
  try {
    //check email/phoneNumber/username are exists
    let validRegister = await Validate.validEPUPExists(rawUserData);

    if (validRegister && validRegister.EC === 1) {
      return validRegister;
    }
    // hash userPassword
    let hashPassword = Validate.hashUserPassword(rawUserData.password);

    // crete new user
    await db.User.create({
      username: rawUserData.username,
      email: rawUserData.email,
      password: hashPassword,
      sex: rawUserData.gender,
      address: rawUserData.address,
      phone: rawUserData.phoneNumber,
      groupId: 5,
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
        // Get Token
        let groupWithRoles = await getGroupWithRoles(user);
        let payload = {
          email: user.email,
          username: user.username,
          groupWithRoles,
          expiresIn: process.env.JWT_EXPIRES_IN,
        };

        let token = createJWT(payload);

        return {
          EM: "Login successfully",
          EC: 0,
          DT: {
            access_token: token,
            data: groupWithRoles,
            email: user.email,
            username: user.username,
          },
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
