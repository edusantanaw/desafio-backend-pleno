import mongoose from "mongoose";
import dotenv from "./dotenv";

dotenv();

const DATABASE = process.env.DATABASE!;
  console.log(DATABASE)
mongoose
  .connect(DATABASE)
  .then(() => {
    console.log("mongodb connected!");
  })
  .catch((err) => {
    throw new Error("mongodb failed!");
  });

export default mongoose;
