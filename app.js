import express from "express";
import cors from "cors";
import "dotenv/config";

import { userRouter } from "./routers/index.js";

const port = process.env.SERVER_PORT || 7000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import "./model/db.js";

app.use("/api/v1", userRouter);

app.get("/", (req, res) => {
  res.send("Welcome Home");
});

// Joi validation error handler middleware
app.use((err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    console.log(err.error.details);
    res.status(422).json({
      type: err.type,
      message: err.error.toString(),
    });
  } else {
    // pass on to another error handler
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
  next(err);
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
