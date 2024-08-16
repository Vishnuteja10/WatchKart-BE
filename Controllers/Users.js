const bcrypt = require("bcrypt");
const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();

const register = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ error: "All fields are reqired!" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({
        success: true,
        emailExists: true,
        message: "email already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, mobile, password: hashedPassword });

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);

    const userid = await user._id;

    res
      .status(200)
      .json({ success: true, token, user: email, name: name, userid });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid user or password" });
    }

    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched) {
      return res.status(400).json({ error: "Invalid user or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);

    const userid = await user._id;

    res.json({
      success: true,
      user: user.email,
      token,
      userid,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

module.exports = {
  login,
  register,
};
