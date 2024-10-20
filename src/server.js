import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

// Config view Engine
configViewEngine(app);

// Config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ express: true }));

// init web routes
initWebRoutes(app);

app.listen(PORT, () => {
  console.log(">>> JWT Backend is running on the port: " + PORT);
});
