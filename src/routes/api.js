import express from "express";
import apiController from "../controller/apiController";

const router = express.Router();

/**
 *
 * @param {*} app - express app
 */

const initAPIRoutes = (app) => {
  //path, handlers
  // rest API
  router.get("/test-api", apiController.testAPI);
  router.post("/register", apiController.handleRegister);

  return app.use("/api/v1/", router);
};

export default initAPIRoutes;
