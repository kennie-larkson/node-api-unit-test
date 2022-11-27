import User from "../model/user.schema.js";
class UserController {
  home(req, res) {
    res.send("Welcome to user dashboard");
  }

  async createUser(req, res) {
    const { name, email, age } = req.body;

    try {
      const userInfo = new User({
        name,
        email,
        age,
      });

      const user = await User.create(userInfo);

      return res.status(201).json(user);
    } catch (error) {
      //console.log("error" + error);
      return res
        .status(404)
        .json({ message: `Unable to create user: ` + error.message });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await User.find().sort({ date: "desc" });
      const total = users.length;

      //   return res.status(200).json({ users, total });
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ message: `Unable to fetch users `, error });
    }
  }

  async getUserByEmail(req, res) {
    const { email } = req.params;
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(404)
          .json({ message: "Cannot find user with email:" + email });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong. Unable to fetch user.",
        error,
      });
    }
  }

  async getUserByEmailAndUpdate(req, res) {
    const { email } = req.params;
    const { name } = req.body;
    const payload = { name };
    try {
      const user = await User.findOne({ email: email }).updateOne(payload);

      if (user.modifiedCount == 0) {
        return res
          .status(404)
          .json({ message: "Cannot update user with email:" + email });
      }

      return res
        .status(200)
        .json({ message: "User records has been successfully updated" });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong. Unable to update user.",
        error,
      });
    }
  }

  async getUserByEmailAndDelete(req, res) {
    const { email } = req.params;

    try {
      const deleteduser = await User.findOne({ email: email }).deleteOne();

      console.log(deleteduser);

      if (deleteduser.deletedCount == 0) {
        return res
          .status(404)
          .json({ message: "Cannot find user with email:" + email });
      }

      return res
        .status(200)
        .json({ message: "User records have been successfully removed" });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong. Unable to remove user records.",
        error,
      });
    }
  }
}

export const userController = new UserController();
