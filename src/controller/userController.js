import userApiService from "../service/userApiService";

const readFunc = async (req, res) => {
  try {
    console.log("User: ", req.user);

    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;

      let data = await userApiService.getUserWithPagination(+page, +limit);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } else {
      let data = await userApiService.getAllUser();
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1",
      DT: "",
    });
  }
};

const createFunc = async (req, res) => {
  try {
    let data = await userApiService.createUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1",
      DT: "",
    });
  }
};

const updateFunc = async (req, res) => {
  try {
    let data = await userApiService.updateUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1",
      DT: "",
    });
  }
};

const deleteFunc = async (req, res) => {
  try {
    let data = await userApiService.deleteUser(req.body.id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1",
      DT: "",
    });
  }
};

const getUserAccount = async (req, res) => {
  return res.status(200).json({
    EM: "User account retrieved successfully",
    EC: 0,
    DT: {
      access_token: req.token,
      ...req.user,
    },
  });
};

module.exports = {
  readFunc,
  createFunc,
  updateFunc,
  deleteFunc,
  getUserAccount,
};
