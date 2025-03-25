import express from "express";
import cors from "cors";
import { AppDataSource } from "./Dbconfig/dbconnect";
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 9000;
AppDataSource.initialize()
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error: any) => {
    console.log("Error during DataSource initialization", error);
  });
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
