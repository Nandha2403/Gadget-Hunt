const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AdminModel } = require("../model/admin.model");

const adminRouter = express.Router();

// All Admin
adminRouter.get("/", async (req, res) => {
  try {
    const allAdmin = await AdminModel.find();
    res.send({ msg: "All Admin Data", data: allAdmin });
  } catch (err) {
    res.send({ error: err.message });
  }
});

// Register
adminRouter.post("/register", async (req, res) => {
  const payload = req.body;
  const { name, email, password, mobile_no } = payload;
  const isAdminPresent = await AdminModel.find({ email: email });
  if (isAdminPresent) {
    return res.status(200).send({ msg: "Admin already exists", data: [] });
  }
  try {
    if (name && email && password && mobile_no) {
      const hashedPass = bcrypt.hash(password, 5);

      const newAdmin = new AdminModel({ ...payload, password: hashedPass });
      await newAdmin.save();
      res
        .status(200)
        .send({ msd: "Admin has beeb registered", admin: payload });
    } else {
      res.status(400).send({ message: " Please Provide All Details" });
    }
  } catch (err) {
    res.status(400).send({
      message: `Please Try Again Something Went Wrong!\n , ${err.message}`,
    });
  }
});

// Login
adminRouter.post("/login", async (req, res) => {
  const payload = req.body;
  const { email, password } = payload;
  try {
    const isAdminPresent = await AdminModel.find({ email: email });
    if (isAdminPresent.length > 0) {
      const isAuthorized = await bcrypt.compare(
        password,
        isAdminPresent[0].password
      );
      if (isAuthorized) {
        const token = await jwt.sign(
          { adminID: isAdminPresent[0]._id },
          process.env.adminSecretKey
        );
        res.status(200).send({ message: "Login Successful", token: token });
      } else {
        res.status(201).send({ message: "Wrong Credentials!", data: [] });
      }
    } else {
      res.status(201).send({ message: "Wrong Credentials!", data: [] });
    }
  } catch (err) {
    res.status(400).send({
        message: `Please Try Again Something Went Wrong! \n ${error.message}`,
    });
  }
});

module.exports={
    adminRouter
}