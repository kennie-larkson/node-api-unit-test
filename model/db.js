import mongoose from "mongoose";
import "dotenv/config";

const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Database connection established`);
  })
  .catch((err) => {
    console.log("Unable to establish database connection", err);
  });
