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

    console.log(currentRoles);
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong with server response",
      EC: -1,
      DT: [],
    };
  }
};

module.exports = {
  createNewRoles,
};
