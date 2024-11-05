import loginRegisterService from "../service/loginRegisterService";

const testAPI = (req, res) => {
  return res.status(200).json({
    message: "ok",
    data: "test data",
  });
};

const handleRegister = async (req, res) => {
  try {
    // req.body: email, username, password, confirmPassword, gender, address, phoneNumber
    if (
      !req.body.email ||
      !req.body.username ||
      !req.body.password ||
      !req.body.confirmPassword ||
      !req.body.gender ||
      !req.body.address ||
      !req.body.phoneNumber
    ) {
      return res.status(500).json({
        EM: "Missing required parameters", // error message
        EC: "1", // error code
        DT: "", // date
      });
    }

    // services: create user
    let data = await loginRegisterService.registerNewUser(req.body);

    return res.status(200).json({
      EM: data.EM, // error message
      EC: data.EC, // error code
      DT: "", // date
    });
  } catch (err) {
    return res.status(500).json({
      EM: "Error from sever", // error message
      EC: "-1", // error code
      DT: "", // date
    });
  }
};

module.exports = {
  testAPI,
  handleRegister,
};
