const userModel = require("../models/users");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendEmail = require("../middleware/sendEmail");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../middleware/auth");
class User {
  async getAllUser(req, res) {
    try {
      let Users = await userModel
        .find({})
        .populate("allProduct.id", "pName pImages pPrice")
        .populate("user", "name email")
        .sort({ _id: -1 });
      if (Users) {
        return res.json({ Users });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getSingleUser(req, res) {
    let { uId } = req.body;
    if (!uId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let User = await userModel
          .findById(uId)
          .select("name email phoneNumber userImage updatedAt createdAt");
        if (User) {
          return res.json({ User });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async postAddUser(req, res) {
    let { allProduct, user, amount, transactionId, address, phone } = req.body;
    if (
      !allProduct ||
      !user ||
      !amount ||
      !transactionId ||
      !address ||
      !phone
    ) {
      return res.json({ message: "All filled must be required" });
    } else {
      try {
        let newUser = new userModel({
          allProduct,
          user,
          amount,
          transactionId,
          address,
          phone,
        });
        let save = await newUser.save();
        if (save) {
          return res.json({ success: "User created successfully" });
        }
      } catch (err) {
        return res.json({ error: error });
      }
    }
  }

  async postEditUser(req, res) {
    let { uId, name, phoneNumber } = req.body;
    if (!uId || !name || !phoneNumber) {
      return res.json({ message: "All filled must be required" });
    } else {
      let currentUser = userModel.findByIdAndUpdate(uId, {
        name: name,
        phoneNumber: phoneNumber,
        updatedAt: Date.now(),
      });
      currentUser.exec((err, result) => {
        if (err) console.log(err);
        return res.json({ success: "User updated successfully" });
      });
    }
  }

  async getDeleteUser(req, res) {
    let { oId, status } = req.body;
    if (!oId || !status) {
      return res.json({ message: "All filled must be required" });
    } else {
      let currentUser = userModel.findByIdAndUpdate(oId, {
        status: status,
        updatedAt: Date.now(),
      });
      currentUser.exec((err, result) => {
        if (err) console.log(err);
        return res.json({ success: "User updated successfully" });
      });
    }
  }

  async changePassword(req, res) {
    let { uId, oldPassword, newPassword } = req.body;
    if (!uId || !oldPassword || !newPassword) {
      return res.json({ message: "All filled must be required" });
    } else {
      const data = await userModel.findOne({ _id: uId });
      if (!data) {
        return res.json({
          error: "Invalid user",
        });
      } else {
        const oldPassCheck = await bcrypt.compare(oldPassword, data.password);
        if (oldPassCheck) {
          newPassword = bcrypt.hashSync(newPassword, 10);
          let passChange = userModel.findByIdAndUpdate(uId, {
            password: newPassword,
          });
          passChange.exec((err, result) => {
            if (err) console.log(err);
            return res.json({ success: "Password updated successfully" });
          });
        } else {
          return res.json({
            error: "Your old password is wrong!!",
          });
        }
      }
    }
  }

  async forgotPassword(req, res) {
    const user = await User.findOne({ email: req.body.email.toLowerCase() });

    if (!user) {
      return res.json({
        error: "No user with this email!!",
      });
    }

    // Create resetToken
    const resetToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_ACCESS_KEY,
      {
        expiresIn: "30m",
      }
    );

    fullResetToken = "Bearer " + resetToken;
    const URL =
      "http://localhost:3001/verify/reset-password/" + fullTokenActivate;

    const message = `Click <a href = "${URL}" > here  </a> to reset your password`;

    try {
      await sendEmail(res, req.body.email, "Reset your password", message);
      res.status(200).json({ success: true, data: "Email sent" });
    } catch (err) {
      console.log(err);
      return res.json({
        error: "Email could not be sent!!",
      });
    }
  }

  async resetPassword(req, res) {
    let token = req.headers.token;
    const userToken = generateToken(token);

    const user = await User.findById(userToken._id);

    if (!user) {
      return res.json({
        error: "Invalid token",
      });
    }
    // Set new password
    user.password = req.body.password;
    await user.save();
  }
}

const ordersController = new User();
module.exports = ordersController;
