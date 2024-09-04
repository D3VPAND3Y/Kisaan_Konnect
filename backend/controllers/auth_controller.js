const zod = require("zod");
const express = require("express");
const jwt = require("jsonwebtoken");
const User  = require("../models/user_model.js");

const userRoute = express.Router();

const signupBody = zod.object({
    fullName: zod.string(),
    useremail: zod.string().email(),
    password: zod.string(),
  });

  const signinBody = zod.object({
    useremail: zod.string().email(),
    password: zod.string(),
  });


userRoute.post("/signup", async (req, res) => {
    try {
      const user = new User({
        fullName: req.body.fullName,
        useremail: req.body.useremail,
        password: req.body.password,
      });
      console.log(user)

      await user.save();

      const token = jwt.sign(
        {
          userId: user._id,
          email: req.body.useremail,
        },
        process.env.JWT_SECRET
      );

      res.json({
        message: "User created successfully",
        token: token,
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(err => err.message);
        return res.status(411).json({
          message: "Validation failed",
          errors: errors
        });
      }

      if (error.code === 11000) {
        return res.status(411).json({
          message: "Email already taken",
        });
      }
      console.log(error)

      return res.status(500).json({
        message: "Server error",
      });
    }
  })

userRoute.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        message: "Please provide a valid email and password.",
      });
    }

    const user = await User.findOne({
      useremail: req.body.useremail,
    });

    if (!user) {
      return res.status(411).json({
        message: "Email not available.",
      });
    }

    const isPasswordCorrect = user.password === req.body.password;
    if (!isPasswordCorrect) {
      return res.status(411).json({
        message: "Incorrect password.",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: req.body.useremail,
      },
      process.env.JWT_SECRET
    );

    res.json({
      token: token,
    });
  });

module.exports = {
    userRoute
};