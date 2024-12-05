import db from "../models/index";

const createNewRoles = async (roles) => {
  try {
    let currentRoles = await db.Role.findAll({
      attributes: ["url", "description"],
      raw: true,
    });

    const persists = roles.filter(
      ({ url: urlNew }) =>
        !currentRoles.some(({ url: urlCurrent }) => urlNew === urlCurrent)
    );

    if (persists.length === 0) {
      return {
        EM: "Nothing to create...",
        EC: 0,
        DT: [],
      };
    }
    await db.Role.bulkCreate(persists);
    return {
      EM: `Create roles successfully: ${persists.length} roles`,
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong with server response",
      EC: -1,
      DT: [],
    };
  }
};

const getAllRoles = async () => {
  try {
    let roles = await db.Role.findAll({
      attributes: ["id", "url", "description"],
    });
    if (roles) {
      return {
        EM: "Get Roles successfully",
        EC: 0,
        DT: roles,
      };
    }

    return {
      EM: "Get roles failed",
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

const getRoleWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.Role.findAndCountAll({
      offset: offset,
      limit: limit,
      attributes: ["id", "url", "description"],
      order: [["id", "ASC"]],
    });

    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      roles: rows,
    };

    return {
      EM: "Get Roles successfully",
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

const updateRole = async (rawData) => {
  try {
    let role = await db.Role.findOne({
      where: { id: rawData.id },
    });
    if (role) {
      //update role
      await role.update({
        url: rawData.url,
        description: rawData.description,
      });
      return {
        EM: "Update Role successfully",
        EC: 0,
        DT: [],
      };
    } else {
      // not found
      return {
        EM: "Not found role",
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

const deleteRole = async (id) => {
  try {
    let role = await db.Role.findOne({
      where: { id: id },
    });

    if (role) {
      await role.destroy();
      return {
        EM: "Delete Role successfully",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "Role not exist",
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

module.exports = {
  createNewRoles,
  getAllRoles,
  getRoleWithPagination,
  updateRole,
  deleteRole,
};
