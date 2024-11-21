import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initAPIRoutes from "./routes/api";
import bodyParser from "body-parser";
import configCORS from "./config/cors";
// import connection from "./config/connectDB";
import { createJWT, verifyToken } from "./middleware/JWTActions";

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

// test connection DB
// connection();

// Test JWT
createJWT();
let decodedData = verifyToken(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQmVRdWFuZyIsImFkZHJlc3MiOiJUUEhDTSIsImlhdCI6MTczMjE4MDQ5OH0.tCaimQfzhDtVwKglU8zqe-K0XnHqqI7IAyRb9yq60ns"
);
console.log(decodedData);

// init web, API routes
initWebRoutes(app);
initAPIRoutes(app);

app.listen(PORT, () => {
  console.log(">>> JWT Backend is running on the port: " + PORT);
});
