import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initAPIRoutes from "./routes/api";
import bodyParser from "body-parser";
import configCORS from "./config/cors";
import cookieParser from "cookie-parser";
// import connection from "./config/connectDB";

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

// Config CORS
configCORS(app);

// Config view Engine
configViewEngine(app);

// Config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ express: true }));

// config cookie parser
app.use(cookieParser());

// test connection DB
// connection();

// init web, API routes
initWebRoutes(app);
initAPIRoutes(app);

// req => middleware => res
app.use((req, res) => {
  return res.send("404 Not Found");
});
app.listen(PORT, () => {
  console.log(">>> JWT Backend is running on the port: " + PORT);
});
