import express from "express";
import homeController from "../controller/homeController";
import apiController from "../controller/apiController";

const router = express.Router();

/**
 *
 * @param {*} app - express app
 */

const initWebRoutes = (app) => {
  //path, handlers
  router.get("/", homeController.handleHomePage);
  router.get("/user", homeController.handleUserPage);
  router.post("/users/create-user", homeController.handleCreateNewUser);
  router.post("/delete-user/:id", homeController.handleDeleteUser);
  router.get("/update-user/:id", homeController.getUpdateUserPage);
  router.post("/user/update-user", homeController.handleUpdateUser);

  // path API
  router.get("/api/test-api", apiController.testAPI);

  return app.use("/", router);
};

export default initWebRoutes;
