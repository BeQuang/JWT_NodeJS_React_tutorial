import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
// import connection from "./config/connectDB";

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", process.env.REACT_URL);

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, OPTIONS"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the request sent
  // to the API (e.g. in case you use session)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer to middleware
  next();
});

// Config view Engine
configViewEngine(app);

// Config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ express: true }));

// test connection DB
// connection();

// init web routes
initWebRoutes(app);

app.listen(PORT, () => {
  console.log(">>> JWT Backend is running on the port: " + PORT);
});
