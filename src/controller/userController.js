import userApiService from "../service/userApiService";

const readFunc = async (req, res) => {
  try {
    let data = await userApiService.getAllUser();
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

const createFunc = async (req, res) => {
  try {
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
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1",
      DT: "",
    });
  }
};

module.exports = {
  readFunc,
  createFunc,
  updateFunc,
  deleteFunc,
};
