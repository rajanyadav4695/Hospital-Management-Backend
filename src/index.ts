import express from "express";
import "reflect-metadata";
import dotenv from "dotenv";
import cors from "cors";
import { AppDataSource } from "./Dbconfig/dbconnect";
import fileUpload from 'express-fileupload'
import { route } from "./Route/router";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload())

AppDataSource.initialize()
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error: any) => {
    console.log("Error during DataSource initialization", error);
  });
app.use("/v1/api",route)
const PORT=process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
