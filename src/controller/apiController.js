const testAPI = (req, res) => {
  return res.status(200).json({
    message: "ok",
    data: "test data",
  });
};

module.exports = {
  testAPI,
};
