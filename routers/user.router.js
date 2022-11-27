import express from "express";
import { userController } from "./../controllers/index.js";

import Joi from "joi";
import validator from "express-joi-validation";

const querySchema = new Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  age: Joi.number().required(),
});

const userRouter = express.Router();

userRouter.get("/userhome", userController.home);
userRouter.post(
  "/users/new",
  // if this joi validation returns as error,it is handled in app.js by error handler middleware
  validator.createValidator({ passError: true }).body(querySchema),
  userController.createUser
);
userRouter.get("/users", userController.getAllUsers);
userRouter.get("/users/:email", userController.getUserByEmail);
userRouter.put("/users/:email", userController.getUserByEmailAndUpdate);
userRouter.delete("/users/:email", userController.getUserByEmailAndDelete);
export default userRouter;
