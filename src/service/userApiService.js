import { where } from "sequelize/lib/sequelize";
import db from "../models/index";

const getAllUser = async () => {
  try {
    let users = await db.User.findAll({
      attributes: ["id", "email", "username", "address", "sex", "phone"],
      include: { model: db.Group, attributes: ["name", "description"] },
    });
    if (users) {
      return {
        EM: "Get data successfully",
        EC: 0,
        DT: users,
      };
    }

    return {
      EM: "Get data failed",
      EC: -1,
      DT: [],
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Something wrong with server response",
      EC: -1,
      DT: [],
    };
  }
};

const getUserWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.User.findAndCountAll({
      offset: offset,
      limit: limit,
    });

    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      users: rows,
    };

    return {
      EM: "Get data successfully",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Something wrong with server response",
      EC: -1,
      DT: [],
    };
  }
};

const createUser = async (rawData) => {
  try {
  } catch (e) {
    console.log(e);
    return {
      EM: "Something wrong with server response",
      EC: -1,
      DT: [],
    };
  }
};

const updateUser = async (rawData) => {
  try {
    let user = await db.User.findOne({
      where: { id: rawData.id },
    });
    if (user) {
      //update user
      user.save();
      return {
        EM: "Update user successfully",
        EC: -1,
        DT: [],
      };
    } else {
      // not found
      return {
        EM: "Not found user",
        EC: -1,
        DT: [],
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "Something wrong with server response",
      EC: -1,
      DT: [],
    };
  }
};

const deleteUser = async (id) => {
  try {
    await db.User.delete({
      where: { id: id },
    });

    return {
      EM: "Delete user successfully",
      EC: -1,
      DT: [],
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Something wrong with server response",
      EC: -1,
      DT: [],
    };
  }
};

module.exports = {
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
  getUserWithPagination,
};
